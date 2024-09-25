"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, getFormattedCurrentDate } from "@/lib/utils";
import Image from "next/image";
import { addBook } from "@/lib/actions/book.actions";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	price: z.number().positive({
		message: "Price must be a positive number.",
	}),
	authorName: z.string().min(2, {
		message: "Author name must be at least 2 characters.",
	}),
	stock: z.number().int().positive({
		message: "Stock must be a positive integer.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	image: z.instanceof(File, {
		message: "Please select an image file.",
	}),
	publishedDate: z.date({
		required_error: "Published date is required.",
	}),
});

export default function AddBookForm() {
	const [fieldKey, setFieldKey] = useState(Date.now());
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			price: 0,
			authorName: "",
			stock: 0,
			description: "",
		},
	});

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();

			// Iterate over the keys of the values object
			Object.keys(values).forEach((key) => {
				const value = values[key as keyof typeof values];

				// Check if the value is a File, if not, convert it to a string
				if (value instanceof File) {
					formData.append(key, value); // Append file directly
				} else {
					formData.append(key, value.toString()); // Convert everything else to a string
				}
			});

			const bookInfo = await addBook(formData);

			if (bookInfo?.success) {
				toast("Book has been created", {
					description: getFormattedCurrentDate(),
					action: {
						label: "Ok",
						onClick: () => {},
					},
				});
				form.reset();
				setImagePreview(null);
				setFieldKey(Date.now());
			} else {
				console.log(bookInfo);
				toast.error("Book can't be added, try again");
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-8 pb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Book Name</FormLabel>
									<FormControl>
										<Input
											disabled={form.formState.isSubmitting}
											placeholder="Enter book name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter price"
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="authorName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Author Name</FormLabel>
									<FormControl>
										<Input
											disabled={form.formState.isSubmitting}
											placeholder="Enter author name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Stock</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter stock quantity"
											{...field}
											onChange={(e) =>
												field.onChange(parseInt(e.target.value, 10))
											}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											disabled={form.formState.isSubmitting}
											placeholder="Enter book description"
											className="resize-none h-32"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Book Cover Image</FormLabel>
									<FormControl>
										<Input
											key={fieldKey}
											disabled={form.formState.isSubmitting}
											type="file"
											accept="image/*"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													field.onChange(file);
													const reader = new FileReader();
													reader.onloadend = () => {
														setImagePreview(reader.result as string);
													};
													reader.readAsDataURL(file);
												}
											}}
										/>
									</FormControl>
									{imagePreview && (
										<Image
											src={imagePreview}
											alt="Book cover preview"
											className="mt-2 w-32 h-48 object-cover rounded"
											height={192}
											width={128}
										/>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="publishedDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Published Date</FormLabel>
									<div className="flex space-x-2">
										<Select
											onValueChange={(value) => {
												setSelectedYear(parseInt(value, 10));
												if (selectedMonth !== null) {
													const newDate = new Date(
														parseInt(value, 10),
														selectedMonth,
														1
													);
													field.onChange(newDate);
												}
											}}
										>
											<SelectTrigger className="w-[120px]">
												<SelectValue placeholder="Year" />
											</SelectTrigger>
											<SelectContent>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											onValueChange={(value) => {
												setSelectedMonth(parseInt(value, 10));
												if (selectedYear !== null) {
													const newDate = new Date(
														selectedYear,
														parseInt(value, 10),
														1
													);
													field.onChange(newDate);
												}
											}}
										>
											<SelectTrigger className="w-[120px]">
												<SelectValue placeholder="Month" />
											</SelectTrigger>
											<SelectContent>
												{months.map((month, index) => (
													<SelectItem
														key={month}
														value={index.toString()}
													>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-[120px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "d")
													) : (
														<span>Day</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={(date) => {
														if (date) {
															const newDate = new Date(
																selectedYear || date.getFullYear(),
																selectedMonth !== null
																	? selectedMonth
																	: date.getMonth(),
																date.getDate()
															);
															field.onChange(newDate);
														}
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className="flex justify-center">
					<Button disabled={form.formState.isSubmitting} type="submit">
						{form.formState.isSubmitting ? "Adding Book" : "Add Book"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
