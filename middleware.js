import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - public files
     * - homepage (/)
     * - /search
     * - dynamic numeric or slug routes like /123 or /some-id
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|search$|$|\\d+$|[a-zA-Z0-9_-]+$).*)',
  ],
}

