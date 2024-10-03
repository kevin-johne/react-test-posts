import React from "react";
import { UserDetails } from "../types";
import { useFetch } from "../hooks/useRequests";

type UserContext = {
  data: UserDetails | null;
  error: unknown | null;
  setUserId: (userId: number) => void;
};

const Context = React.createContext<UserContext | null>(null);

export const UserProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: number;
}) => {
  const [id, setId] = React.useState<number>(userId);
  const { data: userDetails, error } = useFetch<UserDetails>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return (
    <Context.Provider value={{ data: userDetails, error, setUserId: setId }}>
      {children}
    </Context.Provider>
  );
};

export const useUser = (): UserContext => {
  const context = React.useContext(Context);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
