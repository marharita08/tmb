import { MutationKey } from "@/const/mutation-key";
import { boardService } from "@/services/board.service";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useCreateBoard = () => {
  const { setBoard } = useCurrentBoardStore();

  return useAppMutation([MutationKey.CREATE_BOARD], {
    mutationFn: boardService.create,
    onSuccess: (data) => {
      setBoard(data);
      toast({
        title: "Board created successfully",
        variant: "success",
      });
    },
  });
};
