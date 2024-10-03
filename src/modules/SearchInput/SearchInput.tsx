import Icon from "@ant-design/icons";
import { Input } from "antd";
import CloseIcon from "icons/CloseIcon";
import SearchIcon from "icons/SearchIcon";
import "./SearchInput.css";
import React from "react";

type SearchProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function SearchInput({ value = "", onChange }: SearchProps) {
  const isFilled = value !== "";
  return (
    <Input
      className={`search-input ${isFilled ? "-filled" : ""}`}
      size="large"
      placeholder="Search posts"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      prefix={<Icon component={SearchIcon} />}
      suffix={
        isFilled ? (
          <Icon component={CloseIcon} onClick={() => onChange("")} />
        ) : null
      }
    />
  );
}
