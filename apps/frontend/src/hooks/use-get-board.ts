//import { useQueryClient } from "@tanstack/react-query";

import { MutationKey } from "@/const/mutation-key";
//import { QueryKey } from "@/const/query-key";
import { boardService } from "@/services/board.service";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { useAppMutation } from "./use-app-mutation";

export const useGetBoard = () => {
  const { setBoard } = useCurrentBoardStore();
  //const queryClient = useQueryClient();

  return useAppMutation([MutationKey.GET_BOARD], {
    mutationFn: boardService.findOne,
    onSuccess: (data) => {
      /*queryClient.removeQueries({
        queryKey: [QueryKey.TASKS],
      });*/
      setBoard(data);
    },
  });
};
