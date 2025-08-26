import { camelKeys } from "string-ts";
import { z, ZodString } from "zod";

const schema = z.object({
  VITE_SUPABASE_URL: z.string().min(1),
  VITE_SUPABASE_KEY: z.string().min(1),
  VITE_PAYPAL_CLIENT_ID: z.string().min(1),
  S3_BUCKET: z.string().min(1),
});

const publicSchema = schema.pick({
  VITE_SUPABASE_URL: true,
  VITE_SUPABASE_KEY: true,
  VITE_PAYPAL_CLIENT_ID: true,
});

function makeTypedEnv<T>(schema: { parse: (data: unknown) => T }) {
  return (args: Record<string, unknown>) => camelKeys(schema.parse(args));
}

export const getEnvFrom = makeTypedEnv(schema);

// For server-side usage
export const getEnv = () => {
  return makeTypedEnv(schema)(process.env);
};

// For client-side usage (only VITE_ envs are available)
export const getPublicEnv = () => {
  return makeTypedEnv(publicSchema)(import.meta.env);
};
