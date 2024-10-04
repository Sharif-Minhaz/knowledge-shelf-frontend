"use server";

import { revalidatePath } from "next/cache";
import { TLoginParams, TRegistrationParams } from "../../../types";
import { handleError } from "../throwError";
import { convertToPlainObject } from "../utils";
import { secret } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export const currentUser = async () => {
	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get("accessToken");
	const refreshTokenCookie = cookieStore.get("refreshToken");

	let accessTokenValue: string = accessTokenCookie?.value as string;

	if (!accessTokenCookie?.value && !refreshTokenCookie?.value) return null;

	if (refreshTokenCookie?.value && !accessTokenCookie?.value) {
		console.log(
			"===================== Cookies should save on the browser as it's in the try-catch block"
		);
		try {
			const host = secret.publicUrl;
			const res = await fetch(`${host}/api/refresh-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(refreshTokenCookie?.value),
			});
			console.log(res);
			const tokensInfo = await res.json();
			console.log("Api response: ", tokensInfo);
			accessTokenValue = tokensInfo.accessToken;
		} catch (error) {
			console.log("<--------------------Error occurred: ", error);
		}
	}

	if (!accessTokenValue) throw Error("Can't set the tokens in cookies");

	console.log("Access token value", accessTokenValue);

	const decoded = jwtDecode(accessTokenValue);

	return decoded;
};

export const logout = async () => {
	const cookieStore = cookies();
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");

	return { success: true };
};

export const login = async (data: TLoginParams) => {
	const res = await fetch(`${secret.baseUrl}/auth/login`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"content-type": "application/json",
		},
	});

	const userInfo = await res.json();

	if (userInfo.success) {
		await setAuthCookies({
			accessToken: userInfo.accessToken,
			refreshToken: userInfo.refreshToken,
		});
		revalidatePath("/");
	}

	return convertToPlainObject(userInfo);
};

export const register = async (data: TRegistrationParams) => {
	try {
		const res = await fetch(`${secret.baseUrl}/auth/registration`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"content-type": "application/json",
			},
		});

		const userInfo = await res.json();

		return convertToPlainObject(userInfo);
	} catch (error: unknown) {
		console.log(error);
		handleError(error, 500);
	}
};

export const refreshTokenFunc = async (value: string) => {
	const res = await fetch(`${secret.baseUrl}/auth/refresh-token`, {
		method: "POST",
		body: JSON.stringify({ refreshToken: value }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const tokens = await res.json();
	setAuthCookies({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });

	return {
		refreshToken: tokens.refreshToken as string,
		accessToken: tokens.accessToken as string,
	};
};

export const getProfile = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken");

	if (!accessToken?.value) return redirect("/login");

	const res = await fetch(`${secret.baseUrl}/profile`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`,
			"Content-Type": "application/json",
		},
	});
	const bookInfo = await res.json();

	return convertToPlainObject(bookInfo);
};

export const setAuthCookies = async ({
	accessToken,
	refreshToken,
}: {
	accessToken: string;
	refreshToken: string;
}) => {
	const cookieStore = cookies();
	cookieStore.set("accessToken", accessToken, {
		httpOnly: true,
		path: "/",
		expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
		sameSite: "lax",
	});
	cookieStore.set("refreshToken", refreshToken, {
		httpOnly: true,
		path: "/",
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
		sameSite: "lax",
	});
};
