import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const AuthContext = createContext();

const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthProvider>
  </QueryClientProvider>
  
);
