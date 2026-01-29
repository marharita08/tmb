import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { TaskStatus, TaskStatusLabels } from "@/const/task-status";
import { useTasks } from "@/hooks/use-tasks";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { TaskCard } from "./task-card";
import { Loading } from "./ui/loading";
import { AddTaskDialog } from "./add-task-dialog";

type BoardColumnProps = {
  taskStatus: TaskStatus;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ taskStatus }) => {
  const { board } = useCurrentBoardStore();

  const {
    data: tasks,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTasks({ boardId: board?.id ?? "", status: taskStatus });

  const { ref: observerTarget, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const isEmpty =
    !isLoading &&
    !isError &&
    (!tasks || tasks.pages.flatMap((page) => page.items).length === 0);

  return (
    <div>
      <h3 className="text-lg font-semibold text-center">
        {TaskStatusLabels[taskStatus]}
      </h3>
      <div className="bg-primary/20 p-4 rounded-md flex flex-col gap-4">
        {isEmpty && <div className="text-center">No tasks found</div>}
        {tasks?.pages
          .flatMap((page) => page.items)
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        {isLoading || (isFetchingNextPage && <Loading />)}
        {isError && (
          <div className="text-error flex items-center gap-2 justify-center">
            <CircleXIcon className="w-4 h-4 text-error" />
            Error loading tasks
          </div>
        )}
        <div ref={observerTarget} />
        {taskStatus === TaskStatus.TODO && <AddTaskDialog />}
      </div>
    </div>
  );
};
