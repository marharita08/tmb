import { MutationKey } from "@/const/mutation-key";
import type { UpdateBoardSchema } from "@/schemas/update-board.schema";
import { boardService } from "@/services/board.service";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useUpdateBoard = () => {
  return useAppMutation([MutationKey.UPDATE_BOARD], {
    mutationFn: ({ id, data }: { id: string; data: UpdateBoardSchema }) =>
      boardService.update(id, data),
    onSuccess: () => {
      toast({
        title: "Board updated successfully",
        variant: "success",
      });
    },
  });
};
