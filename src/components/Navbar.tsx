import { useAuth } from "@/context/AuthProvider";
import { Button } from "./ui/button";

const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <nav className="w-full bg-card shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-30 border-b border-border">
      <a href="/" className="text-2xl font-bold text-primary tracking-tight">
        CoachingApp
      </a>
      <div className="flex gap-4 items-center">
        <a
          href="#features"
          className="text-primary hover:text-secondary font-medium transition"
        >
          Features
        </a>
        <a
          href="#community"
          className="text-primary hover:text-secondary font-medium transition"
        >
          Community
        </a>
        {!loggedIn && (
          <Button asChild>
            <a href="/register">Sign Up</a>
          </Button>
        )}
        {loggedIn && (
          <Button asChild>
            <a href="/dashboard">Dashboard</a>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
