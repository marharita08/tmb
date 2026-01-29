import { AddBoardDialog } from "./add-board-dialog";

export const Header = () => {
  return (
    <header className="bg-primary/10 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">
        Task Management Boards
      </h1>
      <AddBoardDialog />
    </header>
  );
};
