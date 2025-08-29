import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../components/ui/button";
import { LogIn, Users, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Personalized Coaching",
    description:
      "Get tailored plans and 1-on-1 sessions to reach your goals faster.",
    icon: <LogIn className="w-12 h-12 text-primary" />,
  },
  {
    title: "Progress Tracking",
    description: "Visualize your journey and celebrate your achievements.",
    icon: <BarChart3 className="w-12 h-12 text-primary" />,
  },
  {
    title: "Community Support",
    description: "Join a vibrant community and stay motivated together.",
    icon: <Users className="w-12 h-12 text-primary" />,
  },
];

const Navbar = () => (
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
      <Button asChild>
        <a href="/register">Sign Up</a>
      </Button>
    </div>
  </nav>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center py-24 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-primary">
          Unlock Your Potential
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your life with expert coaching, personalized plans, and a
          supportive community. Start your journey today!
        </p>
        <Button
          asChild
          size="lg"
          className="mb-12 px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
        >
          <a href="/register">Get Started</a>
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-accent rounded-xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
