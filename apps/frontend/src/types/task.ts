import type { TaskStatus } from "@/const/task-status";

export type TaskResponse = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type TaskListResponse = {
  items: TaskResponse[];
  total: number;
  page: number;
  totalPages: number;
}
