import axios from "axios";
import { type ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "../contexts";

// eslint-disable-next-line react-refresh/only-export-components
export const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

const getAuth = () => JSON.parse(localStorage.getItem("token") || "{}");

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuth();

    if (config.headers) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const WithAxios = ({ children }: { children?: ReactNode }) => {
  const { setAuthData } = useContext(AuthContext);

  useMemo(() => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setAuthData(null);
            return;
          } else {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [setAuthData]);

  return <>{children}</>;
};
