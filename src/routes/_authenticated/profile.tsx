import { createFileRoute } from "@tanstack/react-router";
import { Field, FormikProvider, useFormik } from "formik";
import type { AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/context/AuthProvider";

import Section from "@/components/Profile/Section";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/auth";
import coachesService from "@/services/coaches";
import type { Coach } from "@/types/coaches";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const isCoach = user.roles.includes("coach");

  const { data } = useQuery<AxiosResponse<Coach>>({
    queryFn: coachesService.getCurrent,
    queryKey: ["current-coach"],
  });

  const { mutate } = useMutation({
    mutationFn: authService.update,
  });

  const formik = useFormik({
    initialValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      description: data?.data?.description ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="p-8">
        <h1 className="text-3xl mb-8">Your profile</h1>
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || undefined}
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
          contentClass="flex-row items-center"
        >
          <img
            src={user.avatar || undefined}
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
              <Field name="description" as={Textarea} />
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
