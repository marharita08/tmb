import { QueryKey } from "@/const/query-key";
import { boardService } from "@/services/board.service";

import { useAppQuery } from "./use-app-query";

/*export const useGetBoard = () => {
  const { setBoard } = useCurrentBoardStore();
  const queryClient = useQueryClient();

  return useAppMutation([MutationKey.GET_BOARD], {
    mutationFn: boardService.findOne,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TASKS],
      });
      setBoard(data);
    },
  });
};*/

export const useGetBoard = (boardId: string | null) => {
  return useAppQuery({
    queryKey: [QueryKey.BOARDS, boardId],
    queryFn: () => boardService.findOne(boardId ?? ""),
    enabled: !!boardId,
  });
};
