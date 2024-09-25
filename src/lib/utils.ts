import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFormattedCurrentDate() {
	// Create a date object (for example: December 3, 2023, 9:00 AM)
	const date = new Date(); // Month is zero-indexed (11 is December)

	// Format the date
	const formattedDate = format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");

	return formattedDate; // Output: Sunday, December 03, 2023 at 9:00 AM
}

export function convertToPlainObject(data: unknown) {
	const res = JSON.parse(JSON.stringify(data));

	return res;
}
