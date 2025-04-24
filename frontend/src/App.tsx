import { ConfigProvider, theme, App as AntdApp } from "antd";
import "./App.css";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AntdApp>
        <TodoList />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
