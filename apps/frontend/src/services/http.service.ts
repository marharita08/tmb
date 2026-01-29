import { HttpException } from "@/types/exception";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type QueryParams =
  | Record<string, string | number | boolean | null | undefined>
  | Record<string, Array<string | number | boolean>>;

interface RequestConfig<TBody = unknown> {
  method: HttpMethod;
  body?: TBody;
  params?: QueryParams;
  headers?: Record<string, string>;
  retry?: boolean;
}

class HttpService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildQuery(params?: QueryParams): string {
    if (!params) return "";

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    });

    const query = searchParams.toString();
    return query ? `?${query}` : "";
  }

  private async request<TResponse, TBody = unknown>(
    url: string,
    config: RequestConfig<TBody>,
  ): Promise<TResponse> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    const query = this.buildQuery(config.params);

    const response = await fetch(`${this.baseUrl}${url}${query}`, {
      method: config.method,
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const contentType = response.headers.get("Content-Type");
    const rawText = await response.text();

    const body =
      rawText && contentType?.includes("application/json")
        ? (JSON.parse(rawText) as TResponse)
        : (rawText as unknown as TResponse);

    if (!response.ok) {
      throw new HttpException(response, body as { message: string });
    }

    return body;
  }

  get<TResponse>(url: string, params?: QueryParams): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "GET",
      params,
    });
  }

  delete<TResponse>(url: string, params?: QueryParams): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "DELETE",
      params,
    });
  }

  post<TResponse, TBody>(
    url: string,
    body: TBody,
    params?: QueryParams,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(url, {
      method: "POST",
      body,
      params,
    });
  }

  patch<TResponse, TBody>(
    url: string,
    body: TBody,
    params?: QueryParams,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(url, {
      method: "PATCH",
      body,
      params,
    });
  }
}

export const httpService = new HttpService(process.env.NEXT_PUBLIC_API_URL!);
