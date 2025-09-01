import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import { InnerApp } from "./InnerApp";

const client = new QueryClient();

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
