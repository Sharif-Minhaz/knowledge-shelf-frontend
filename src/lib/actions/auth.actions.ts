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
	const accessToken = cookieStore.get("accessToken");

	if (!accessToken?.value) return null;

	const decoded = jwtDecode(accessToken?.value);

	return decoded;
};

export const logout = async () => {
	const cookieStore = cookies();
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");

	return { success: true };
};

export const login = async (data: TLoginParams) => {
	try {
		const cookieStore = cookies();

		const res = await fetch(`${secret.baseUrl}/auth/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"content-type": "application/json",
			},
		});

		const userInfo = await res.json();

		if (userInfo.success) {
			cookieStore.set("accessToken", userInfo.accessToken, {
				httpOnly: true,
				path: "/",
				expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
			});
			cookieStore.set("refreshToken", userInfo.refreshToken, {
				httpOnly: true,
				path: "/",
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
			});
			revalidatePath("/");
		}

		return convertToPlainObject(userInfo);
	} catch (error: unknown) {
		handleError(error, 500);
	}
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

export const refreshToken = async () => {
	try {
	} catch (error: unknown) {
		handleError(error, 500);
	}
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
