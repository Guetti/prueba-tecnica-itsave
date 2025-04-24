import { z } from "zod";

// This schema defines the structure of a task object
// and validates the data types of its properties.
const TaskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(100),
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
