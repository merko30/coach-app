import { useAuth } from "@/context/AuthProvider";

const useIsCoach = () => {
  const { user } = useAuth();

  return user?.roles?.includes("coach");
};

export default useIsCoach;
