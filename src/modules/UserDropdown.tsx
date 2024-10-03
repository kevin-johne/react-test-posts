import { DownOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Space } from "antd";
import { useUser } from "../context/UserContext";
import { useFetch } from "../hooks/useRequests";
import { PrimaryButton } from "../patterns/Buttons/Button";
import { UserDetails } from "../types";

export default function UserDropdown() {
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
