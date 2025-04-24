import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  App,
  Badge,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  List,
} from "antd";
import useTasks from "../hooks/useTasks";
import TaskListSkeleton from "./ListSkeleton";
import { useEffect, useState } from "react";
import { Task } from "../schemas/task.schema";

/**
 * * TodoList component that displays a list of tasks and allows the user to
 * * add, toggle, and delete tasks. It synchronizes with a backend API
 * * to fetch and update tasks using the useTasks hook.
 */
export const TodoList = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { tasks, createTask, toggleTask, deleteTask, initialLoading, error } =
    useTasks();

  const [showSkeleton, setShowSkeleton] = useState(false);

  const getBadgeStatus = (): {
    color: "error" | "processing" | "success";
    text: string;
  } => {
    if (initialLoading)
      return { color: "processing", text: "Sincronizando..." };
    if (error) return { color: "error", text: "Error al sincronizar" };
    return { color: "success", text: "Sincronizado" };
  };

  const badgeStatus = getBadgeStatus();

  /**
   * Handles the addition of a new task. It validates the form fields,
   * creates a new task using the createTask function, and resets the form fields.
   */
  const handleAddTask = async () => {
    const values = await form.validateFields();

    await createTask({
      title: values.task,
      description: values.description || "",
    });

    message.success("Tarea añadida correctamente");
    form.resetFields();
  };

  /**
   * Handles the toggling of a task's completion status. It updates the task
   * using the toggleTask function and displays a success message.
   */
  const handleToggleTask = async (taskId: number) => {
    await toggleTask(taskId);
    message.success("Tarea actualizada correctamente");
  };

  /**
   * Handles the deletion of a task. It removes the task using the deleteTask
   * function and displays a success message.
   */
  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    message.success("Tarea eliminada correctamente");
  };

  /**
   * Renders a task item in the list. It displays the task title and description,
   * along with a checkbox to mark it as completed and a button to delete it.
   */
  const TaskItem = ({ task }: { task: Task }) => (
    <List.Item
      key={task.id}
      style={{ alignItems: "flex-start" }}
      actions={[
        <Button
          type="text"
          danger
          shape="circle"
          icon={<CloseOutlined />}
          onClick={() => handleDeleteTask(task.id)}
        />,
      ]}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => handleToggleTask(task.id)}
        style={{ marginRight: 8 }}
      />
      <List.Item.Meta
        title={
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              overflowWrap: "break-word",
            }}
          >
            {task.title}
          </span>
        }
        description={
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              overflowWrap: "break-word",
            }}
          >
            {task.description}
          </span>
        }
      />
    </List.Item>
  );

  useEffect(() => {
    // Show skeleton after 300ms if initialLoading is true
    // to avoid flickering when the component mounts
    // and the initial loading is fast
    const timeout = setTimeout(() => setShowSkeleton(true), 300);
    if (!initialLoading) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [initialLoading]);

  return (
    <Card
      title={
        <Flex
          justify="space-between"
          align="center"
          style={{
            width: "100%",
          }}
        >
          <span>TO-DO List 📖</span>
          <Badge
            status={badgeStatus.color}
            text={badgeStatus.text}
            style={{
              backgroundColor: badgeStatus.color,
            }}
          />
        </Flex>
      }
      variant="borderless"
      style={{
        width: 640,
        minHeight: 640,
      }}
    >
      <Form
        form={form}
        onFinish={handleAddTask}
        autoComplete="off"
        variant="filled"
        disabled={initialLoading || error !== null}
      >
        <Form.Item
          name="task"
          style={{
            marginBottom: 8,
          }}
          rules={[
            {
              required: true,
              message: "El título es obligatorio",
            },
            {
              max: 100,
              message: "El título no puede tener más de 100 caracteres",
            },
          ]}
        >
          <Input placeholder="Título" />
        </Form.Item>
        <Form.Item
          name="description"
          style={{
            marginBottom: 12,
          }}
        >
          <Input.TextArea
            placeholder="Añadir descripción (opcional)"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          style={{
            width: "100%",
          }}
        >
          Añadir tarea
        </Button>
      </Form>
      {initialLoading && showSkeleton ? (
        TaskListSkeleton()
      ) : (
        <List
          dataSource={tasks}
          locale={{
            emptyText: error
              ? "Ha ocurrido un error al sincronizar con la base de datos, asegurate de que el servidor está corriendo y vuelve a cargar la página"
              : initialLoading
              ? " "
              : "No hay tareas",
          }}
          style={{
            marginTop: 16,
          }}
          size="small"
          renderItem={(task) => <TaskItem task={task} key={task.id} />}
        />
      )}
    </Card>
  );
};
