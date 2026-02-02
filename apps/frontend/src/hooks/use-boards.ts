import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/const/query-key";
import { boardService } from "@/services/board.service";
import type { GetBoardsQuery } from "@/types/get-boards-query.type";

export const useBoards = (query: GetBoardsQuery) => {
  return useInfiniteQuery({
    queryKey: [QueryKey.BOARDS],
    queryFn: async ({ pageParam = 1 }) =>
      boardService.findAll({ page: pageParam, ...query }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.totalPages > pages.length ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });
};
