import {
  type MutationKey,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";

import { HttpException } from "@/types/exception";

type AppMutationProps<
  TData = unknown,
  TError = HttpException,
  TVariables = void,
  TContext = unknown,
> = {
  defaultErrorHandling?: boolean;
} & Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationKey"
>;

export const useAppMutation = <
  TData = unknown,
  TError = HttpException,
  TVariables = void,
  TContext = unknown,
>(
  mutationKey: MutationKey = [],
  {
    defaultErrorHandling = true,
    ...params
  }: AppMutationProps<TData, TError, TVariables, TContext>,
) =>
  useMutation({
    mutationKey,
    ...params,
    onError: (error, variables, context, mutation) => {
      if (defaultErrorHandling) {
        if (error instanceof HttpException) {
          const { body } = error;
          toast({
            title: `${body?.message}`,
            variant: "destructive",
          });
        } else {
          console.error(error);
          toast({
            title: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }

      params.onError?.(error, variables, context, mutation);
    },
  });
