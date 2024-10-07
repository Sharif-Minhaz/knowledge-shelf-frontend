import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_ROUTES, LOGIN, SIGNIN, ROOT, ADMIN_ROUTES } from "@/lib/routes";
import { currentUser, refreshTokenFunc } from "./lib/actions/auth.actions";
import { TUser } from "../types";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const finalResponse = NextResponse.next();

	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get("accessToken");
	const refreshTokenCookie = cookieStore.get("refreshToken");

	let accessTokenValue: string = accessTokenCookie?.value as string;
	let refreshTokenValue: string = refreshTokenCookie?.value as string;

	if (!accessTokenCookie?.value && !refreshTokenCookie?.value) return null;

	if (refreshTokenCookie?.value && !accessTokenCookie?.value) {
		const newTokens = await refreshTokenFunc(refreshTokenValue);

		accessTokenValue = newTokens.accessToken;
		refreshTokenValue = newTokens.refreshToken;

		finalResponse.cookies.set("accessToken", accessTokenValue, {
			httpOnly: true,
			path: "/",
			expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
			sameSite: "lax",
		});
		finalResponse.cookies.set("refreshToken", refreshTokenValue, {
			httpOnly: true,
			path: "/",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
			sameSite: "lax",
		});
	}

	const user = await currentUser(); // this should trigger the cookies which will be set

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

	return finalResponse;
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
