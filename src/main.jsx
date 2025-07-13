import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
export const AuthContext = createContext();

const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthProvider>
                <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </QueryClientProvider>
  
  
);
