import { refreshTokenFunc } from "@/lib/actions/auth.actions";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, response: NextApiResponse) {
	const cookieStore = cookies();
	const body = await new Response(req.body).text();
	const refreshTokenValue = JSON.parse(body);

	if (!refreshTokenValue) {
		return response.status(401).json({ error: "No refresh token" });
	}

	const { accessToken, refreshToken } = await refreshTokenFunc(refreshTokenValue);

	console.log(
		"==================== Route.ts: Cookies should set from here +++++++++++++++++++++"
	);

	const res = NextResponse.json({ success: true, accessToken, refreshToken });

	cookieStore.set("accessToken", accessToken, {
		httpOnly: true,
		path: "/",
		expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
		sameSite: "lax",
	});
	cookieStore.set("refreshToken", refreshToken, {
		httpOnly: true,
		path: "/",
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
		sameSite: "lax",
	});

	return res;
}
