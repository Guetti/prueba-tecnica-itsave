import { List, Skeleton, Button, Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const TaskListSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 }, (_, index) => ({
    key: `skeleton-${index}`,
  }));

  return (
    <List
      dataSource={skeletonItems}
      locale={{ emptyText: "Cargando tareas..." }}
      style={{ marginTop: 16 }}
      size="small"
      renderItem={(item) => (
        <List.Item
          key={item.key}
          style={{
            alignItems: "flex-start",
          }}
          actions={[
            <Button
              type="text"
              danger
              shape="circle"
              icon={<CloseOutlined />}
              disabled
            />,
          ]}
        >
          <Checkbox disabled style={{ marginRight: 8 }} />
          <List.Item.Meta
            title={
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: "60%" }}
                style={{
                  marginBottom: 16,
                }}
              />
            }
            description={
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: "80%" }}
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TaskListSkeleton;
