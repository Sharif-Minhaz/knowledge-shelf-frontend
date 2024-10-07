"use server";

import { revalidatePath } from "next/cache";
import { TLoginParams, TRegistrationParams } from "../../../types";
import { handleError } from "../throwError";
import { convertToPlainObject } from "../utils";
import { secret } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const currentUser = async () => {
	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get("accessToken");
	const value = accessTokenCookie?.value;

	if (!value) {
		return null;
	}

	const decoded = jwtDecode(value);
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
		console.error(error);
		handleError(error, 500);
	}
};

export const refreshTokenFunc = async (refreshToken: string) => {
	const res = await fetch(`${secret.baseUrl}/auth/refresh-token`, {
		method: "POST",
		body: JSON.stringify({ refreshToken }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const tokens = await res.json();
	if (!tokens.success) {
		throw Error(tokens.message);
	}

	return {
		refreshToken: tokens.refreshToken as string,
		accessToken: tokens.accessToken as string,
	};
};

export const getProfile = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken");

	if (!accessToken?.value) throw Error("Access token not found in the cookies");

	const res = await fetch(`${secret.baseUrl}/auth/profile`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`,
			"Content-Type": "application/json",
		},
	});
	const profileInfo = await res.json();

	return convertToPlainObject(profileInfo);
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
