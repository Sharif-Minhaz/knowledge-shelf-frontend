import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_ROUTES, LOGIN, SIGNIN, ROOT } from "@/lib/routes";
import { currentUser } from "./lib/actions/auth.actions";

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const user = await currentUser();

	const isAuthenticated = !!user;

	const isPublicRoute =
		PUBLIC_ROUTES.find((route) => nextUrl.pathname === route) || nextUrl.pathname === ROOT;

	if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(LOGIN, nextUrl));
	if (isAuthenticated && (nextUrl.pathname === LOGIN || nextUrl.pathname === SIGNIN))
		return NextResponse.redirect(new URL(ROOT, request.nextUrl));
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
