import {
  createRootRouteWithContext,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";

import appCss from "@/styles/app.css?url";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import type { AuthContextType } from "@/context/AuthProvider";
import { router } from "../main";

const client = new QueryClient();

interface RouterContext {
  auth: AuthContextType;
}

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <InnerApp />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <InnerApp />
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
});
