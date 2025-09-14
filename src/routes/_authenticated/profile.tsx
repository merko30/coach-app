import { lazy, Suspense, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Field, FormikProvider, useFormik } from "formik";
import type { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Section from "@/components/Profile/Section";

import { useAuth } from "@/context/AuthProvider";

import authService from "@/services/auth";

import type { User } from "@/types/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoachTabSkeleton from "@/components/Profile/CoachTabSkeleton";

const CoachTab = lazy(() => import("@/components/Profile/CoachTab"));

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("user");
  const isCoach = user.roles.includes("coach");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const { data: userData } = useQuery<AxiosResponse<User>>({
    queryFn: authService.getUser,
    queryKey: ["user"],
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

  return (
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
      <Tabs defaultValue="user" onValueChange={(tab) => setActiveTab(tab)}>
        <TabsList className="mt-8">
          <TabsTrigger value="user">Basic information</TabsTrigger>
          <TabsTrigger value="coach">Coach</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <FormikProvider value={formik}>
            <Section
              title="Personal information"
              subtitle="Edit your information"
            >
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
            <Button
              className="block ml-auto mt-8"
              type="button"
              onClick={() => formik.handleSubmit()}
            >
              Save
            </Button>
          </FormikProvider>
        </TabsContent>
        {isCoach && activeTab === "coach" && (
          <Suspense fallback={<CoachTabSkeleton />}>
            <CoachTab />
          </Suspense>
        )}
      </Tabs>
    </div>
  );
}
