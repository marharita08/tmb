import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/const/query-key";
import { taskService } from "@/services/task.service";
import type { GetTasksQuery } from "@/types/get-tasks-query.type";

export const useTasks = (query: GetTasksQuery) => {
  return useInfiniteQuery({
    queryKey: [QueryKey.TASKS, { ...query }],
    queryFn: ({ pageParam = 1 }) =>
      taskService.findAll({ page: pageParam, ...query }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.totalPages > pages.length ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });
};
