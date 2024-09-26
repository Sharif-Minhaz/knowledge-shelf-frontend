"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { TBook } from "../../../types";
import { getFormattedCurrentDate } from "@/lib/utils";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

const formSchema = z.object({
	orderName: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	quantity: z.number().int().positive({
		message: "Quantity must be a positive integer.",
	}),
	total: z.number().positive({
		message: "Total must be a positive number.",
	}),
	phoneNumber: z.string().regex(/^[0-9]{11}$/, {
		message: "Phone number must be 11 digits.",
	}),
	address: z.string().min(5, {
		message: "Address must be at least 5 characters.",
	}),
	tranxId: z.string().min(8, {
		message: "Transaction ID must be at least 8 characters.",
	}),
});

export default function CheckoutForm({ book }: { book: TBook }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			orderName: "",
			quantity: 1,
			total: book.price,
			phoneNumber: "",
			address: "",
			tranxId: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values, book._id, "orderInfo");
		// Handle form submission here
		toast("Order has been placed", {
			description: getFormattedCurrentDate(),
			action: {
				label: "Ok",
				onClick: () => {},
			},
		});
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Toaster />
			<h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-center text-xl">Book Information</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center">
						<Image
							src={book.image}
							alt={book.name}
							height={392}
							width={288}
							className="object-cover mb-4 rounded-md shadow-md border"
						/>
						<h2 className="text-2xl font-semibold mb-2">{book.name}</h2>
						<p className="text-gray-600 mb-2">by {book.authorName}</p>
						<p className="text-2xl font-bold">${book.price.toFixed(2)}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Order Details</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="orderName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter your name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="quantity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) => {
														const value = parseInt(e.target.value, 10);
														field.onChange(value);
														form.setValue("total", value * book.price);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="total"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Total</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													disabled
													value={field.value.toFixed(2)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your phone number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Enter your address"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="tranxId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Transaction ID</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter transaction ID"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Place Order
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
