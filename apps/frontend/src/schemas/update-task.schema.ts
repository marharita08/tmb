import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
