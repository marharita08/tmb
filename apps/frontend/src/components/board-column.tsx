import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { TaskStatus, TaskStatusLabels } from "@/const/task-status";
import { useTasks } from "@/hooks/use-tasks";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { AddTaskDialog } from "./add-task-dialog";
import { SortableTaskCard } from "./sortable-task-card";
import { Loading } from "./ui/loading";

type BoardColumnProps = {
  taskStatus: TaskStatus;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ taskStatus }) => {
  const { board } = useCurrentBoardStore();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
    hasNextPage,
    fetchNextPage,
  } = useTasks({ boardId: board?.id ?? "", status: taskStatus });
  const { ref: observerTarget, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const tasks = data?.pages.flatMap((page) => page.items);

  const isEmpty = !isLoading && !isError && (!tasks || tasks.length === 0);

  const { setNodeRef } = useDroppable({
    id: taskStatus,
  });

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-center">
        {TaskStatusLabels[taskStatus]}
      </h3>

      <div className="bg-primary/20 p-4 rounded-md flex flex-col gap-4 flex-1">
        <SortableContext
          id={taskStatus}
          items={tasks?.map((t) => t.id) ?? []}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="flex flex-col gap-4">
            {tasks?.map((task) => (
              <SortableTaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {isEmpty && <div className="text-center">No tasks found</div>}

        {(isLoading || isFetchingNextPage || status === "pending") && (
          <div className="flex items-center justify-center w-full">
            <Loading />
          </div>
        )}

        {isError && (
          <div className="text-error flex items-center gap-2 justify-center">
            <CircleXIcon className="w-4 h-4" />
            Error loading tasks
          </div>
        )}

        <div ref={observerTarget} />

        {taskStatus === TaskStatus.TODO && <AddTaskDialog />}
      </div>
    </div>
  );
};
