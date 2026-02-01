import { MutationKey } from "@/const/mutation-key";
import { taskService } from "@/services/task.service";
import type { MoveTaskBody } from "@/types/move-task-body.type";

import { useAppMutation } from "./use-app-mutation";

export const useMoveTask = () => {
  return useAppMutation([MutationKey.MOVE_TASK], {
    mutationFn: ({ id, data }: { id: string; data: MoveTaskBody }) =>
      taskService.move(id, data),
  });
};
