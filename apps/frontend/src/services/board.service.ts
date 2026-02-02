import { BackendRouterKey } from "@/const/backend-router-key";
import type { AddBoardSchema } from "@/schemas/add-board.schema";
import type { UpdateBoardSchema } from "@/schemas/update-board.schema";
import type { BoardResponse } from "@/types/board.type";
import type { GetBoardsQuery } from "@/types/get-boards-query.type";
import type { PaginatedResponse } from "@/types/paginated-response.type";

import { httpService } from "./http.service";

class BoardService {
  async create(data: AddBoardSchema) {
    return httpService.post<BoardResponse, AddBoardSchema>(
      BackendRouterKey.BOARDS,
      data,
    );
  }

  async findOne(id: string) {
    return httpService.get<BoardResponse>(`${BackendRouterKey.BOARDS}/${id}`);
  }

  async findAll(query: GetBoardsQuery) {
    return httpService.get<PaginatedResponse<BoardResponse>>(
      BackendRouterKey.BOARDS,
      query,
    );
  }

  async update(id: string, data: UpdateBoardSchema) {
    return httpService.patch<BoardResponse, UpdateBoardSchema>(
      `${BackendRouterKey.BOARDS}/${id}`,
      data,
    );
  }

  async delete(id: string) {
    return httpService.delete<void>(`${BackendRouterKey.BOARDS}/${id}`);
  }
}

export const boardService = new BoardService();
