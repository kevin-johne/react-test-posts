import {
  DownOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "./Page.css";
import AvatarButton from "../patterns/Buttons/AvatarButton";
import { Link } from "react-router-dom";
import React from "react";
import { useFetch } from "../hooks/useRequests";
import { UserDetails } from "../types";
import { useUser } from "../context/UserContext";
import { PrimaryButton } from "../patterns/Buttons/Button";

interface PageProps {
  title: string;
  children: JSX.Element;
}

export default function Page(props: PageProps) {
  const { title, children } = props;

  return (
    <Layout>
      <Header className="page-header">
        <div className="page-header-item left">
          <Link to="/active-user">
            <AvatarButton icon={<UserOutlined />} />
          </Link>
          <Link to="/posts">
            <AvatarButton icon={<UnorderedListOutlined />} />
          </Link>
        </div>
        <h1>{title}</h1>
        <div className="page-header-item right">
          <UserDropdown />
        </div>
      </Header>
      <Content className="page-content">{children}</Content>
    </Layout>
  );
}

function UserDropdown() {
  const { data: users, isLoading } = useFetch<UserDetails[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  const { data: userDetails, setUserId } = useUser();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setUserId(Number(e.key));
  };

  const menuProps = {
    items: users?.map((user) => ({
      key: user.id,
      label: user.name,
    })),
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <PrimaryButton loading={isLoading}>
        <Space>
          {userDetails?.name || "Select user"}
          <DownOutlined />
        </Space>
      </PrimaryButton>
    </Dropdown>
  );
}
