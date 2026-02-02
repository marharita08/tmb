import { useQueryClient } from "@tanstack/react-query";

import { MutationKey } from "@/const/mutation-key";
import { QueryKey } from "@/const/query-key";
import { boardService } from "@/services/board.service";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const { clearBoard } = useCurrentBoardStore();

  return useAppMutation([MutationKey.DELETE_BOARD], {
    mutationFn: boardService.delete,
    onSuccess: () => {
      clearBoard();
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BOARDS],
      });
      toast({
        title: "Board deleted successfully",
        variant: "success",
      });
    },
  });
};
