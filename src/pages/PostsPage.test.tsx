import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostsPage from "./PostsPage";
import { UserContext } from "context/UserContext";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve(
      new Response(
        JSON.stringify([
          {
            userId: 1,
            id: 1,
            title: "post 1 foo",
            body: "lorem",
          },
          {
            userId: 1,
            id: 1,
            title: "post 2 bar",
            body: "lorem",
          },
        ])
      )
    )
  );
});

const setup = async () => {
  const utils = render(
    <UserContext.Provider
      value={{
        data: {
          id: 1,
          name: "John Doe",
          email: "john@doe.com",
          phone: "123456789",
          website: "www.johndoe.com",
        },
        error: null,
        setUserId: () => {},
      }}
    >
      <PostsPage />
    </UserContext.Provider>
  );
  const input = await waitFor(
    () => screen.getByRole("textbox") as HTMLInputElement
  );

  return {
    input,
    ...utils,
  };
};

test("Shows posts with empty search", async () => {
  const { input } = await setup();

  expect(input.value).toBe("");
  expect(screen.getByText("post 1 foo")).toBeInTheDocument();
  expect(screen.getByText("post 2 bar")).toBeInTheDocument();
});

test("Shows filter post with filled search", async () => {
  const { input } = await setup();

  fireEvent.change(input, { target: { value: "foo" } });
  expect(input.value).toBe("foo");
  expect(screen.getByText("post 1 foo")).toBeInTheDocument();
  expect(screen.queryByText("post 2 bar")).not.toBeInTheDocument();
});
