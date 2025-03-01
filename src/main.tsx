import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts";
import { WithAxios } from "./lib/axios.tsx";
import "./styles/_main.scss";
import theme from "./styles/theme.ts";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <MantineProvider theme={theme}>
          <WithAxios>
            <Notifications position="top-right" />
            <App />
          </WithAxios>
        </MantineProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
