import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProfile } from "@/lib/actions/auth.actions";
import { IOrderHistory } from "../../../../types";
import Link from "next/link";

export default async function ProfilePage() {
	const { user, history } = await getProfile();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>User Profile</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center space-y-4">
						<Avatar className="h-40 w-40 border">
							<AvatarImage src={user.avatar} alt={user.fullName} />
							<AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
						</Avatar>
						<h2 className="text-2xl font-bold">{user.fullName}</h2>
						<p className="text-gray-500">{user.email}</p>
						<Badge>{user.role}</Badge>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Order History</CardTitle>
					</CardHeader>
					<CardContent>
						{history.length ? (
							<ScrollArea className="h-[350px] w-full rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Book</TableHead>
											<TableHead>Quantity</TableHead>
											<TableHead>Total</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<>
											{history.map((order: IOrderHistory) => (
												<TableRow key={order._id}>
													<TableCell>
														<div className="flex items-center space-x-3">
															<Image
																src={order.bookId.image}
																alt={order.bookId.name}
																className="rounded-sm object-cover"
																height={40}
																width={40}
															/>
															<div>
																<div className="font-bold">
																	{order.bookId.name}
																</div>
																<div className="text-sm text-gray-500">
																	{order.bookId.authorName}
																</div>
															</div>
														</div>
													</TableCell>
													<TableCell>{order.quantity}</TableCell>
													<TableCell>${order.total.toFixed(2)}</TableCell>
												</TableRow>
											))}
										</>
									</TableBody>
								</Table>
							</ScrollArea>
						) : (
							<div className="flex items-center flex-col justify-center gap-4 h-full mt-10">
								<p className="text-center">No order information available.</p>
								<Link href="/books">
									<button className="bg-blue-600 rounded-lg px-3 py-1.5 text-white">
										Order Now
									</button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
