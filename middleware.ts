import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // First, handle i18n routing
    const response = handleI18nRouting(request);

    // Then, attach Supabase session cookies to the response
    await updateSession(request, response);

    return response;
}

export const config = {
    // Match only internationalized pathnames
    // Omit api routes, next static files, public files etc.
    matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
