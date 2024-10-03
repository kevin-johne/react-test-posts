import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ConfigProvider } from "antd";
import { lazy } from "react";
import React from "react";
import { UserProvider } from "./context/UserContext";
const UserDetailsPage = lazy(() => import("./pages/UserDetailsPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Helvetica Neue",
          colorPrimary: "black",
        },
      }}
    >
      <UserProvider userId={1}>
        <BrowserRouter>
          <Routes>
            <Route
              path="posts"
              element={
                <WithLoadingState>
                  <PostsPage />
                </WithLoadingState>
              }
            />
            <Route
              path="active-user"
              element={
                <WithLoadingState>
                  <UserDetailsPage />
                </WithLoadingState>
              }
            />
            <Route
              path="*"
              element={
                <WithLoadingState>
                  <PostsPage />
                </WithLoadingState>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ConfigProvider>
  );
}

function WithLoadingState({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
}

export default App;
