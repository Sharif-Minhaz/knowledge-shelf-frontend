"use server";

import { secret } from "@/config";
import { handleError } from "../throwError";
import { convertToPlainObject } from "../utils";
import { revalidatePath } from "next/cache";

export const getAllBooks = async () => {
	try {
		const res = await fetch(`${secret.baseUrl}/book`, { cache: "no-store" });
		const booksInfo = await res.json();

		return convertToPlainObject(booksInfo);
	} catch (error: unknown) {
		handleError(error, 500);
	}
};

export const getSingleBook = async (bookId: string) => {
	try {
		const res = await fetch(`${secret.baseUrl}/book/${bookId}`);
		const bookInfo = await res.json();

		return convertToPlainObject(bookInfo);
	} catch (error: unknown) {
		handleError(error, 500);
	}
};

export const addBook = async (bookData: FormData) => {
	try {
		const res = await fetch(`${secret.baseUrl}/book`, {
			method: "POST",
			body: bookData,
		});

		if (!res.ok) {
			handleError(`Failed to add book: ${res.status} ${res.statusText}`);
		}

		const bookInfo = await res.json();

		revalidatePath("/book");
		return convertToPlainObject(bookInfo);
	} catch (error: unknown) {
		handleError(error, 500);
	}
};
