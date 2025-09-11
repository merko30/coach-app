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
      <div className="flex flex-col md:flex-row gap-12 py-8 border-b border-gray-100">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg">Personal information</h3>
          <p className="text-muted-foreground text-sm">Edit your information</p>
        </div>
        <div className="w-full md:w-2/3">
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div>
              <Label>Name</Label>
              <Input />
            </div>
            <div>
              <Label>Username</Label>
              <Input />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 py-8 border-b border-gray-100">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg">Profile photo</h3>
          <p className="text-muted-foreground text-sm">
            Change your profile photo
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <div className="w-full md:w-2/3 flex items-center gap-4">
            <img
              src={user.avatar}
              className="size-16 rounded-full border-gray-100 border-2"
            />
            <Button size="sm">Upload</Button>
            <Button variant="destructive" size="sm">
              Remove profile photo
            </Button>
          </div>
        </div>
      </div>
      {isCoach && (
        <div className="flex flex-col md:flex-row gap-12 py-8 border-b border-gray-100">
          <div className="w-full md:w-1/3">
            <h3 className="text-lg">Coach profile</h3>
            <p className="text-muted-foreground text-sm">
              Information about you as a coach
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div>
                <Label>Description</Label>
                <Textarea />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
