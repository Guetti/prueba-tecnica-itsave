import { useEffect, useState } from "react";
import { Task } from "../schemas/task.schema";
import { create, remove, get, toggle } from "../services/taskService";

/**
 * * Custom hook to manage tasks.
 * * It provides functions to fetch, create, toggle, and delete tasks.
 * * It also manages loading states and error handling.
 */
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches tasks from the API and sets them in the state.
   * It also handles loading states and error handling.
   */
  const fetchTasks = async () => {
    setInitialLoading(true);
    try {
      const response = await get();
      const tasksData = response.data.map((task: Task) => ({
        ...task,
        completed: task.completed || false,
      }));
      setTasks(tasksData);
    } catch (err) {
      setError("Error fetching tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  /**
   * Creates a new task using the API and updates the state.
   * It also handles loading states and error handling.
   */
  const createTask = async (data: { title: string; description: string }) => {
    setActionLoading(true);
    try {
      const response = await create(data);
      console.log("Task created:", response.data);

      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: response.data.id,
          title: data.title,
          description: data.description || "", // Añadir descripción
          completed: false,
        },
      ]);
    } catch (err) {
      setError("Error creating task");
      console.error("Error creating task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Toggles the completion status of a task using the API and updates the state.
   * It also handles loading states and error handling.
   */
  const toggleTask = async (taskId: number) => {
    await toggle(taskId, !tasks.find((task) => task.id === taskId)?.completed);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Deletes a task using the API and updates the state.
   * It also handles loading states and error handling.
   */
  const deleteTask = async (taskId: number) => {
    setActionLoading(true);
    try {
      await remove(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Error deleting task");
      console.error("Error deleting task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    initialLoading,
    actionLoading,
    error,
    fetchTasks,
    createTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
