import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BoardColumn } from "./components/board-column";
import { Header } from "./components/header";
import { LoadBoard } from "./components/load-board";
import { TaskStatus } from "./const/task-status";
import { useCurrentBoardStore } from "./store/current-board.store";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { board } = useCurrentBoardStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Header />
      <main className="px-8 py-4 space-y-4">
        <LoadBoard />
        {board && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              {board.title}{" "}
              <span className="font-normal">(id: {board.id})</span>
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {Object.values(TaskStatus).map((taskStatus) => (
                <BoardColumn key={taskStatus} taskStatus={taskStatus} />
              ))}
            </div>
          </section>
        )}
      </main>
    </QueryClientProvider>
  );
}

export default App;
