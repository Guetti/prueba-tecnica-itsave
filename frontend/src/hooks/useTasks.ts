import { useEffect, useState } from "react";
import { Task } from "../schemas/task.schema";
import { create, remove, get, toggle } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const createTask = async (data: { title: string; description: string }) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: number) => {
    await toggle(taskId, !tasks.find((task) => task.id === taskId)?.completed);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (taskId: number) => {
    setLoading(true);
    try {
      await remove(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Error deleting task");
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
