import React from "react";
import { Flex, Input } from "antd";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <Flex vertical gap={12}>
    <Input.Search
      size="large"
      placeholder="Поиск ученика"
      className={styles.customInput}
      value={value}
      onChange={onChange}
    />
  </Flex>
);
