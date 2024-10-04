import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ConfigProvider } from "antd";
import { UserProvider } from "./context/UserContext";
import UserDetailsPage from "./pages/UserDetailsPage";
import PostsPage from "./pages/PostsPage";
import Layout, { PageTitle } from "layout/Layout";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Helvetica Neue', sans-serif",
          colorPrimary: "black",
        },
      }}
    >
      <UserProvider userId={1}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="posts"
                element={
                  <>
                    <PageTitle title="Posts" />
                    <PostsPage />
                  </>
                }
              />
              <Route
                path="active-user"
                element={
                  <>
                    <PageTitle title="User Details" />
                    <UserDetailsPage />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <PageTitle title="Posts" />
                    <PostsPage />
                  </>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
