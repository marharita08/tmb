import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Board } from "./components/board";
import { DeleteTaskDialog } from "./components/delete-task-dialog";
import { EditTaskDialog } from "./components/edit-task-dialog";
import { Header } from "./components/header";
import { LoadBoard } from "./components/load-board";
import { Toaster } from "./components/ui/toaster";
import { useCurrentBoardStore } from "./store/current-board.store";
import { useTaskDialogsStore } from "./store/task-dialogs.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { board } = useCurrentBoardStore();

  const {
    isEditTaskDialogOpen,
    isDeleteTaskDialogOpen,
    selectedTask,
    closeEditTaskDialog,
    closeDeleteTaskDialog,
  } = useTaskDialogsStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Header />
      <main className="px-8 py-4 space-y-4">
        {selectedTask && (
          <>
            <EditTaskDialog
              open={isEditTaskDialogOpen}
              onOpenChange={closeEditTaskDialog}
              task={selectedTask}
            />
            <DeleteTaskDialog
              open={isDeleteTaskDialogOpen}
              onOpenChange={closeDeleteTaskDialog}
              task={selectedTask}
            />
          </>
        )}
        <LoadBoard />
        {board && <Board />}
      </main>
    </QueryClientProvider>
  );
}

export default App;
