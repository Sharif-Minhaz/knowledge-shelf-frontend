"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { register } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { getFormattedCurrentDate } from "@/lib/utils";
import { IRegistrationRes } from "../../../types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	fullName: z.string().min(2, {
		message: "Full name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const userInfo: IRegistrationRes = await register(values);
			if (userInfo?.success) {
				toast("Registration successful", {
					description: getFormattedCurrentDate(),
					action: {
						label: "Ok",
						onClick: () => {},
					},
				});
				form.reset();
				return router.replace("/login");
			} else {
				toast.error(
					typeof userInfo.message !== "string" ? (
						<ul>
							{(userInfo.message as string[]).map((msg: string, index: number) => (
								<li className="mb-2 last:mb-0" key={index}>
									⚠ {msg}
								</li>
							))}
						</ul>
					) : (
						userInfo.message
					)
				);
			}
		} catch (error: unknown) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Something really screwed up! Try again");
			}
		}
	}

	return (
		<div className="relative flex items-center justify-center min-h-screen bg-gray-100">
			<Link href="/" className="absolute top-2 left-2">
				<ArrowLeft />
			</Link>
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your information to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="john@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													{...field}
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4 text-gray-500" />
													) : (
														<Eye className="h-4 w-4 text-gray-500" />
													)}
													<span className="sr-only">
														{showPassword
															? "Hide password"
															: "Show password"}
													</span>
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Register
							</Button>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="text-blue-500 hover:underline">
							Log in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
