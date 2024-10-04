import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_ROUTES, LOGIN, SIGNIN, ROOT, ADMIN_ROUTES } from "@/lib/routes";
import { currentUser } from "./lib/actions/auth.actions";
import { TUser } from "../types";

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;

	const user = await currentUser();

	const isAuthenticated = !!user;
	const isAdmin = (user as TUser)?.role === "admin";

	const isAdminRoute = ADMIN_ROUTES.find((route) => nextUrl.pathname.startsWith(route));

	const isPublicRoute =
		PUBLIC_ROUTES.find((route) => nextUrl.pathname === route) || nextUrl.pathname === ROOT;

	if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(LOGIN, nextUrl));
	if (isAuthenticated && (nextUrl.pathname === LOGIN || nextUrl.pathname === SIGNIN))
		return NextResponse.redirect(new URL(ROOT, request.nextUrl));

	if (isAdminRoute && (!isAuthenticated || !isAdmin)) {
		// Redirect non-admin users or unauthenticated users from admin routes
		return NextResponse.redirect(new URL(ROOT, nextUrl));
	}
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
