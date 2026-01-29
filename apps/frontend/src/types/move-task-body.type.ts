import type { TaskStatus } from "@/const/task-status";

export type MoveTaskBody = {
  targetStatus: TaskStatus;
  prevTaskId?: string;
  nextTaskId?: string;
};
