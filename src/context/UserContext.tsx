import React from "react";
import { UserDetails } from "../types";
import { useFetch } from "../hooks/useRequests";

type UserContextState = {
  data: UserDetails | null;
  error: unknown | null;
  setUserId: (userId: number) => void;
};

export const UserContext = React.createContext<UserContextState | null>(null);

export const UserProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: number;
}) => {
  const [id, setId] = React.useState<number>(userId);
  const { data: userDetails, isError: error } = useFetch<UserDetails>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return (
    <UserContext.Provider
      value={{ data: userDetails, error, setUserId: setId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextState => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
