import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

export const getServerClient = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!,
    {
      cookies: {
        getAll: () => parseCookieHeader(cookieHeader),
        setAll: (cookies) => {
          for (const cookie of cookies) {
            headers.append(
              "set-cookie",
              serializeCookieHeader(cookie.name, cookie.value, cookie.options)
            );
          }
        },
      },
    }
  );

  return { client: supabase, headers };
};

export const supabase = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
