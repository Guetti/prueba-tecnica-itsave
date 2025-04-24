import { ConfigProvider, theme } from "antd";
import "./App.css";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <TodoList />
    </ConfigProvider>
  );
}

export default App;
