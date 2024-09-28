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
import { IProfileData } from "../../../../types";
import { ScrollArea } from "@/components/ui/scroll-area";

const profileData: IProfileData = {
	success: true,
	user: {
		_id: "667ece1a18bd6b6fdff97eb3",
		fullName: "rabby islam",
		email: "rabby@gmail.com",
		avatar: "https://randomuser.me/api/portraits/men/7.jpg",
		role: "user",
	},
	history: [
		{
			_id: "697ece1a18bd6b6fdff97e99",
			bookId: {
				_id: "667ece1a18bd6b6fdff97ebd",
				name: "compiler design",
				price: 1232,
				authorName: "John von nueman",
				stock: 21,
				description: "Hello world",
				image: "https://res.cloudinary.com/doj7bhnz8/image/upload/v1727268575/Knowledge_Shelf/wzyd8lvaigqwekfhit1i.png",
				imagekey: "sdfsfs/dskfsl",
				publishedDate: "2024-06-28T14:52:10.765+00:00",
				createdAt: "2024-06-28T14:52:10.765+00:00",
				addedBy: "667ece1a18bd6b6fdff97ebd",
			},
			orderName: "Mahin",
			quantity: 2,
			total: 12,
			phoneNumber: "013932874378",
			address: "savar",
			tranxId: "ksfjksekjsdfjkjfksljf",
		},
		{
			_id: "697ece1a18bd6b6fdff97e99",
			bookId: {
				_id: "667ece1a18bd6b6fdff97ebd",
				name: "compiler design",
				price: 1232,
				authorName: "John von nueman",
				stock: 21,
				description: "Hello world",
				image: "https://res.cloudinary.com/doj7bhnz8/image/upload/v1727268575/Knowledge_Shelf/wzyd8lvaigqwekfhit1i.png",
				imagekey: "sdfsfs/dskfsl",
				publishedDate: "2024-06-28T14:52:10.765+00:00",
				createdAt: "2024-06-28T14:52:10.765+00:00",
				addedBy: "667ece1a18bd6b6fdff97ebd",
			},
			orderName: "Mahin",
			quantity: 2,
			total: 12,
			phoneNumber: "013932874378",
			address: "savar",
			tranxId: "ksfjksekjsdfjkjfksljf",
		},
		{
			_id: "697ece1a18bd6b6fdff97e99",
			bookId: {
				_id: "667ece1a18bd6b6fdff97ebd",
				name: "compiler design",
				price: 1232,
				authorName: "John von nueman",
				stock: 21,
				description: "Hello world",
				image: "https://res.cloudinary.com/doj7bhnz8/image/upload/v1727268575/Knowledge_Shelf/wzyd8lvaigqwekfhit1i.png",
				imagekey: "sdfsfs/dskfsl",
				publishedDate: "2024-06-28T14:52:10.765+00:00",
				createdAt: "2024-06-28T14:52:10.765+00:00",
				addedBy: "667ece1a18bd6b6fdff97ebd",
			},
			orderName: "Mahin",
			quantity: 2,
			total: 12,
			phoneNumber: "013932874378",
			address: "savar",
			tranxId: "ksfjksekjsdfjkjfksljf",
		},
		{
			_id: "697ece1a18bd6b6fdff97e99",
			bookId: {
				_id: "667ece1a18bd6b6fdff97ebd",
				name: "Software architecture",
				price: 1232,
				authorName: "John von nueman",
				stock: 21,
				description: "Hello world",
				image: "https://res.cloudinary.com/doj7bhnz8/image/upload/v1727268575/Knowledge_Shelf/wzyd8lvaigqwekfhit1i.png",
				imagekey: "sdfsfs/dskfsl",
				publishedDate: "2024-06-28T14:52:10.765+00:00",
				addedBy: "667ece1a18bd6b6fdff97ebd",
				createdAt: "2024-06-28T14:52:10.765+00:00",
			},
			orderName: "Mahin",
			quantity: 2,
			total: 12,
			phoneNumber: "013932874378",
			address: "savar",
			tranxId: "ksfjksekjsdfjkjfksljf",
		},
		{
			_id: "697ece1a18bd6b6fdff97e99",
			bookId: {
				_id: "667ece1a18bd6b6fdff97ebd",
				name: "Software architecture",
				price: 1232,
				authorName: "John von nueman",
				stock: 21,
				description: "Hello world",
				image: "https://res.cloudinary.com/doj7bhnz8/image/upload/v1727268575/Knowledge_Shelf/wzyd8lvaigqwekfhit1i.png",
				imagekey: "sdfsfs/dskfsl",
				publishedDate: "2024-06-28T14:52:10.765+00:00",
				addedBy: "667ece1a18bd6b6fdff97ebd",
				createdAt: "2024-06-28T14:52:10.765+00:00",
			},
			orderName: "Mahin",
			quantity: 2,
			total: 12,
			phoneNumber: "013932874378",
			address: "savar",
			tranxId: "ksfjksekjsdfjkjfksljf",
		},
	],
};

export default function ProfilePage() {
	const { user, history } = profileData;

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
									{history.map((order) => (
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
								</TableBody>
							</Table>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
