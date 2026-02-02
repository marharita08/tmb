import { BackendRouterKey } from "@/const/backend-router-key";
import type { AddTaskSchema } from "@/schemas/add-task.schema";
import type { UpdateTaskSchema } from "@/schemas/update-task.schema";
import type { GetTasksQuery } from "@/types/get-tasks-query.type";
import type { MoveTaskBody } from "@/types/move-task-body.type";
import type { PaginatedResponse } from "@/types/paginated-response.type";
import type { TaskResponse } from "@/types/task.type";

import { httpService } from "./http.service";

class TaskService {
  async create(data: AddTaskSchema) {
    return httpService.post<TaskResponse, AddTaskSchema>(
      BackendRouterKey.TASKS,
      data,
    );
  }

  async findAll(query: GetTasksQuery) {
    return httpService.get<PaginatedResponse<TaskResponse>>(BackendRouterKey.TASKS, query);
  }

  async delete(id: string) {
    return httpService.delete<void>(`${BackendRouterKey.TASKS}/${id}`);
  }

  async update(id: string, data: UpdateTaskSchema) {
    return httpService.patch<TaskResponse, UpdateTaskSchema>(
      `${BackendRouterKey.TASKS}/${id}`,
      data,
    );
  }

  async move(id: string, data: MoveTaskBody) {
    return httpService.patch<TaskResponse, MoveTaskBody>(
      `${BackendRouterKey.TASKS}/${id}/move`,
      data,
    );
  }
}

export const taskService = new TaskService();
