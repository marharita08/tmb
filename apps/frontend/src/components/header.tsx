import { AddBoardDialog } from "./add-board-dialog";
import { AllBoardsDialog } from "./all-boards-dialog";

export const Header = () => {
  return (
    <header className="bg-primary/10 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">
        Task Management Boards
      </h1>
      <div className="flex items-center gap-2">
        <AddBoardDialog />
        <AllBoardsDialog />
      </div>
    </header>
  );
};
