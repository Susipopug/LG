import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import styles from "./BasicTabs.module.css";

interface TabConfigItem {
  key: string;
  label: string;
  content?: React.ReactNode; // Make content optional since it's missing in your example
}

interface TabConfigs {
  students: TabConfigItem[];
  studentInfo: TabConfigItem[];
  userInfo: TabConfigItem[];
}

interface DynamicTabsProps {
  configKey: keyof TabConfigs;
  defaultTab?: string;
  content?: Record<string, React.ReactNode>;
}

// Configuration for different components
const tabConfigs: TabConfigs = {
  students: [
    { key: "1", label: "Активные студенты" },
    { key: "2", label: "Неактивные студенты" },
  ],
  studentInfo: [
    { key: "1", label: "Общая информация" },
    { key: "2", label: "Баланс уроков" },
  ],
  userInfo: [
    { key: "1", label: "Общая информация" },
    { key: "2", label: "Финансы" },
  ],
};

export const DynamicTabs: React.FC<DynamicTabsProps> = ({
  configKey,
  defaultTab = "1",
}) => {
  const config = tabConfigs[configKey];

  const items: TabsProps["items"] = config.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  return <Tabs defaultActiveKey={defaultTab} items={items} />;
};

// const onChange = (key: string) => {
//   console.log(key);
// };

// const items: TabsProps["items"] = [
//   {
//     key: "1",
//     label: "Активные",
//   },
//   {
//     key: "2",
//     label: "Неактивные",
//   },
// ];

// export const BasicTabs: React.FC = () => (
//   <div className={styles.tab}>
//     <Tabs
//       size="large"
//       tabBarGutter={30}
//       defaultActiveKey="1"
//       items={items}
//       onChange={onChange}
//     />
//   </div>
// );
