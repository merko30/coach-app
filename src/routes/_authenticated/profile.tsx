import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Field, FormikProvider, useFormik } from "formik";
import type { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Section from "@/components/Profile/Section";

import { useAuth } from "@/context/AuthProvider";

import authService from "@/services/auth";
import coachesService from "@/services/coaches";

import type { Coach } from "@/types/coaches";
import type { User } from "@/types/auth";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const isCoach = user.roles.includes("coach");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const { data: userData } = useQuery<AxiosResponse<User>>({
    queryFn: authService.getUser,
    queryKey: ["user"],
  });

  const { data } = useQuery<AxiosResponse<Coach>>({
    queryFn: coachesService.getCurrent,
    queryKey: ["current-coach"],
    enabled: isCoach,
  });

  const { mutate } = useMutation({
    mutationFn: authService.update,
  });

  const { mutate: updateAvatar } = useMutation({
    mutationFn: authService.updateAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.data.name ?? "",
      username: userData?.data.username ?? "",
      description: data?.data?.description ?? "",
      settings: data?.data?.settings || {
        send_welcome_message: false,
        welcome_message: `Hello {athlete_name}, welcome to my coaching!. I'm excited to work with you and help you achieve your fitness goals. Let's get started!`,
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile && selectedFile instanceof File) {
      updateAvatar(selectedFile);
    }
  };

  const { values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <div className="p-8">
        <h1 className="text-3xl mb-8">Your profile</h1>
        <div className="flex items-center gap-4">
          <img
            src={userData?.data.avatar_url || undefined}
            className="size-16 rounded-full border-gray-100 border-2 object-cover"
          />
          <div>
            <h2 className="text-xl">{user.username}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <Section title="Personal information" subtitle="Edit your information">
          <div>
            <Label>Name</Label>
            <Field name="name" as={Input} />
          </div>
          <div>
            <Label>Username</Label>
            <Field name="username" as={Input} />
          </div>
        </Section>
        <Section
          title="Profile photo"
          subtitle="Change your profile photo"
          contentClass="flex-row md:flex-col lg:flex-row items-center"
        >
          <img
            src={userData?.data.avatar_url || undefined}
            className="size-16 flex-none rounded-full border-gray-100 border-2 object-cover"
          />
          <div>
            <Button onClick={() => fileInputRef.current?.click()} size="sm">
              Change avatar
            </Button>
            <input
              hidden
              ref={fileInputRef}
              accept="image/*"
              type="file"
              onChange={onChangeFile}
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => updateAvatar(null)}
          >
            Remove profile photo
          </Button>
        </Section>
        {isCoach && (
          <Section
            title="Coach profile"
            subtitle="Information about you as a coach"
            contentClass="gap-5"
          >
            <div>
              <Label>Description</Label>
              <Field name="description" as={Textarea} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                name="settings.send_welcome_message"
                checked={values.settings.send_welcome_message}
                onCheckedChange={(checked) =>
                  setFieldValue("settings.send_welcome_message", checked)
                }
              />
              <Label className="mb-0">Send welcome message to athlete</Label>
            </div>
            <div>
              <Label>Welcome message</Label>
              <Field
                name="settings.welcome_message"
                as={Textarea}
                disabled={!values.settings.send_welcome_message}
              />
            </div>
          </Section>
        )}
        <Button
          className="block ml-auto mt-8"
          type="button"
          onClick={() => formik.handleSubmit()}
        >
          Save
        </Button>
      </div>
    </FormikProvider>
  );
}
