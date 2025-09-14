import { Field, FormikProvider, useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import coachesService from "@/services/coaches";
import type { Coach } from "@/types/coaches";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

import Section from "./Section";
import { Button } from "../ui/button";

const CoachTab = () => {
  const { data } = useQuery<AxiosResponse<Coach>>({
    queryFn: coachesService.getCurrent,
    queryKey: ["current-coach"],
  });

  const { mutate } = useMutation({
    mutationFn: coachesService.update,
  });

  const formik = useFormik({
    initialValues: {
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

  const { values, setFieldValue } = formik;

  return (
    <TabsContent value="coach">
      <FormikProvider value={formik}>
        <Section
          title="Basic information"
          subtitle="About your coaching"
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
        <Button
          className="block ml-auto mt-8"
          type="button"
          onClick={() => formik.handleSubmit()}
        >
          Save
        </Button>
      </FormikProvider>
    </TabsContent>
  );
};

export default CoachTab;
