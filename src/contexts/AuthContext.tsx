import { useDidUpdate, useLocalStorage } from "@mantine/hooks";
import { ReactNode, createContext } from "react";

type Auth = { accessToken: string; expiresIn: string };

interface AuthContextInterface {
  token?: Auth;
  setAuthData: (data: Auth | null) => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

interface Props {
  children?: ReactNode;
}

export const AuthContextProvider = (props: Props) => {
  const [token, setToken, removeToken] = useLocalStorage<Auth | undefined>({
    key: "token",
  });

  const setAuthData = (data: Auth | null) => {
    if (data) {
      setToken(data);
    } else {
      removeToken();
    }
  };

  useDidUpdate(() => {
    if (!token?.accessToken && window.location.pathname !== "/login") {
      window.location.href = "/login"; // Redirect to login if no token
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setAuthData }}>
      {props.children}
    </AuthContext.Provider>
  );
};
