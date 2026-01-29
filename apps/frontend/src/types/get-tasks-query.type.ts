import type { TaskStatus } from "@/const/task-status";

export type GetTasksQuery = {
  boardId: string;
  status: TaskStatus;
  page?: number;
  limit?: number;
};
