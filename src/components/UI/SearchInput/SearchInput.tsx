import React from "react";
import { Flex, Input } from "antd";
import styles from "./SearchInput.module.css";

export const SearchInput: React.FC = () => (
  <Flex vertical gap={12}>
    <Input.Search placeholder="Поиск ученика" className={styles.customInput} />
  </Flex>
);
