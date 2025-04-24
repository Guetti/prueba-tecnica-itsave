import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  List,
  Row,
  Tooltip,
} from "antd";
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
      <Form form={form} onFinish={handleAddTask}>
        <Row gutter={8}>
          <Col flex="auto">
            <Form.Item
              name="task"
              rules={[
                {
                  required: true,
                  message: "Por favor, añade una tarea",
                },
              ]}
            >
              <Input placeholder="Añadir nueva tarea" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col>
            <Tooltip title="Añadir tarea" placement="top">
              <Button
                htmlType="submit"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </Col>
        </Row>
      </Form>
      <List
        dataSource={tasks}
        locale={{
          emptyText: "No hay tareas pendientes",
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
              description={
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    overflowWrap: "break-word",
                  }}
                >
                  {task.title}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
