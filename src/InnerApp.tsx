import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "./context/AuthProvider";

export const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
