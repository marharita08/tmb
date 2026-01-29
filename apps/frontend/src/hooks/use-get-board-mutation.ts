import { MutationKey } from "@/const/mutation-key";
import { boardService } from "@/services/board.service";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { useAppMutation } from "./use-app-mutation";

export const useGetBoardMutation = () => {
  const { setBoard } = useCurrentBoardStore();

  return useAppMutation([MutationKey.GET_BOARD], {
    mutationFn: boardService.findOne,
    onSuccess: (data) => {
      setBoard(data);
    },
  });
};
