import { Button } from "./ui/button";

const Navbar = () => (
  <nav className="w-full bg-card shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-30 border-b border-border">
    <a href="/" className="text-3xl font-bold text-primary tracking-tight">
      ST<span className="text-foreground">RUN</span>
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
      <Button asChild>
        <a href="/register">Sign Up</a>
      </Button>
    </div>
  </nav>
);

export default Navbar;
