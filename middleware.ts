import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
	...routing,
	localeDetection: false, // disables browser language detection
});
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	// Only redirect if exactly "/" and not already locale-prefixed
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/en", request.url));
	}
	// For locale-prefixed paths, run the intl middleware
	return intlMiddleware(request);
}

export const config = {
	matcher: ["/", "/(en|no|ne)(/.*)?"],
};
