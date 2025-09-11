import Section from "@/components/Profile/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const isCoach = user.roles.includes("coach");
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Your profile</h1>
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          className="size-16 rounded-full border-gray-100 border-2"
        />
        <div>
          <h2 className="text-xl">{user.username}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>
      <Section title="Personal information" subtitle="Edit your information">
        <div>
          <Label>Name</Label>
          <Input />
        </div>
        <div>
          <Label>Username</Label>
          <Input />
        </div>
      </Section>
      <Section
        title="Profile photo"
        subtitle="Change your profile photo"
        contentClass="flex-row items-center"
      >
        <img
          src={user.avatar}
          className="size-16 rounded-full border-gray-100 border-2"
        />
        <Button size="sm">Upload</Button>
        <Button variant="destructive" size="sm">
          Remove profile photo
        </Button>
      </Section>
      {isCoach && (
        <Section
          title="Coach profile"
          subtitle="Information about you as a coach"
        >
          <div>
            <Label>Description</Label>
            <Textarea />
          </div>
        </Section>
      )}
    </div>
  );
}
