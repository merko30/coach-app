import { useMutation } from "@tanstack/react-query";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "sonner";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Section from "../Profile/Section";

import authService from "@/services/auth";
import * as yup from "yup";

const schema = yup.object({
  old_password: yup.string().required("Old password is required field"),

  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .min(8, "Confirm Password must contain at least 8 characters")
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const Password = () => {
  const { mutate } = useMutation({
    mutationFn: authService.updatePassword,
    onSuccess: () => toast.success("Your password has been updated"),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      mutate(values);
    },
  });

  const { errors } = formik;

  return (
    <FormikProvider value={formik}>
      <Section title="Password" subtitle="Update your password">
        <div>
          <Label>Old password</Label>
          <Field name="old_password" type="password" as={Input} />
          {errors.old_password && (
            <p className="text-destructive text-xs">{errors.old_password}</p>
          )}
        </div>
        <div>
          <Label>Password</Label>
          <Field name="password" type="password" as={Input} />
          {errors.password && (
            <p className="text-destructive text-xs">{errors.password}</p>
          )}
        </div>
        <div>
          <Label>Confirm password</Label>
          <Field name="confirmPassword" type="password" as={Input} />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        <Button
          className="block ml-auto mt-8"
          type="button"
          onClick={() => formik.handleSubmit()}
        >
          Save
        </Button>
      </Section>
    </FormikProvider>
  );
};

export default Password;
