import { z } from "zod";

export const addTaskSchema = z.object({
  boardId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type AddTaskSchema = z.infer<typeof addTaskSchema>;
