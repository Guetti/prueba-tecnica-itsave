import { z } from "zod";

const TaskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export type Task = z.infer<typeof TaskSchema>;

export const validateTask = (task: unknown): Task => {
  const result = TaskSchema.safeParse(task);
  if (!result.success) {
    throw new Error("Invalid task data");
  }
  return result.data;
};
