import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const inviteClientFn = async ({ email }: { email: string }) => {
  await fetch("http://localhost:8000/clients/ivnvite", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};

const schema = z.object({
  email: z.email("Invalid email"),
});

const InviteClientModal = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: inviteClientFn,
    onSuccess: console.log,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    const valid = schema.safeParse({ email });

    if (!valid.success) {
      setValidationError(valid.error.issues[0].message);
      return;
    }

    mutate({ email });
  };

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          {error && <p className="text-red-500">{error.message}</p>}
          <DialogHeader>
            <DialogTitle>Invite client</DialogTitle>
            <DialogDescription>
              Enter email address of the client, he will receive your invite.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />
            {validationError && (
              <p className="text-red-500 text-xs font-medium mt-0.5">
                {validationError}
              </p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              Invite client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteClientModal;
