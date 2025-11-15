import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Активные",
  },
  {
    key: "2",
    label: "Неактивные",
  },
];

export const BasicTabs: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <Tabs
      size="large"
      tabBarGutter={30}
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  </div>
);
