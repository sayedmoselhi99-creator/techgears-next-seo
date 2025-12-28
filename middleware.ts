import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // ⛔ Skip middleware for public/static files
  const publicPaths = [
    "/manifest.webmanifest",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return res;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.delete({ name, ...options });
        },
      },
    }
  );

  const { data: auth } = await supabase.auth.getUser();

  // 🔐 Protect only /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!auth.user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next|api).*)",
  ],
};
