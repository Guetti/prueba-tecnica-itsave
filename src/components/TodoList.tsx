import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, List } from "antd";
import { useState } from "react";
import { Task } from "../schemas/task.schema";

export const TodoList = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    form.validateFields().then((values) => {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          title: values.task,
          description: values.description || "", // Añadir descripción
          completed: false,
        },
      ]);
      form.resetFields();
    });
  };

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Card
      title="TO-DO List 📖"
      variant="borderless"
      style={{
        width: 640,
        minHeight: 512,
      }}
    >
      <Form
        form={form}
        onFinish={handleAddTask}
        autoComplete="off"
        variant="filled"
      >
        <Form.Item
          name="task"
          style={{
            marginBottom: 8,
          }}
          rules={[
            {
              required: true,
              message: "Por favor, añade una tarea",
            },
            {
              max: 255,
              message: "El título no puede tener más de 255 caracteres",
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
      <List
        dataSource={tasks}
        locale={{
          emptyText: "No hay tareas pendientes",
        }}
        style={{
          marginTop: 16,
        }}
        size="small"
        renderItem={(task) => (
          <List.Item
            key={task.id}
            style={{
              alignItems: "flex-start",
            }}
            actions={[
              <Button
                type="text"
                danger
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => {
                  setTasks((prevTasks) =>
                    prevTasks.filter((t) => t.id !== task.id)
                  );
                }}
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
        )}
      />
    </Card>
  );
};
