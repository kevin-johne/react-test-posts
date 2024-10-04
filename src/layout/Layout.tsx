import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Layout as AntLayout } from "antd";
import "./Layout.css";
import AvatarButton from "../patterns/Buttons/AvatarButton";
import { Link, Outlet } from "react-router-dom";
import UserDropdown from "../modules/UserDropdown";
import React from "react";

export default function Layout() {
  const [title, setTitle] = React.useState("");
  return (
    <AntLayout>
      <AntLayout.Header className="page-header">
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
      </AntLayout.Header>
      <AntLayout.Content className="page-content">
        <LayoutContext.Provider value={{ title, setTitle }}>
          <Outlet context={{ test: "test" }} />
        </LayoutContext.Provider>
      </AntLayout.Content>
    </AntLayout>
  );
}

/** Context to set the title of the page */
const LayoutContext = React.createContext<{
  title: string;
  setTitle: (title: string) => void;
}>({ title: "", setTitle: () => {} });

export const useLayout = () => {
  const context = React.useContext(LayoutContext);
  if (context === null) {
    throw new Error("useLayout must be used within a LayoutContext.Provider");
  }
  return context;
};

/** Component to set the title of the page */
export function PageTitle(props: { title: string }) {
  const { title } = props;
  const { setTitle } = useLayout();
  React.useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
  return null;
}
