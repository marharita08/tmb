import { CircleXIcon, ListIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useBoards } from "@/hooks/use-boards";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loading } from "./ui/loading";

export const AllBoardsDialog = () => {
  const [open, setOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
  } = useBoards({});
  const { ref: observerTarget, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const boards = data?.pages.flatMap((page) => page.items);
  const isEmpty = !isLoading && !isError && (!boards || boards.length === 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ListIcon className="w-4 h-4" />
          All Boards
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Boards</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto px-4 py-3 flex flex-col gap-2">
          {boards?.map((board) => (
            <div key={board.id}>
              {board.title} <span>({board.id})</span>
            </div>
          ))}
          {isEmpty && <div className="text-center">No boards found</div>}
          {isError && (
            <div className="text-error flex items-center gap-2 justify-center">
              <CircleXIcon className="w-4 h-4" />
              Error loading boards
            </div>
          )}
          {isLoading ||
            isFetchingNextPage ||
            (status === "pending" && (
              <div className="flex items-center justify-center w-full">
                <Loading />
              </div>
            ))}
          <div ref={observerTarget} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
