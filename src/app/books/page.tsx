import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBooks } from "@/lib/actions/book.actions";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TBook } from "../../../types";

export default async function Books() {
	const booksInfo = await getAllBooks();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 relative">
			{booksInfo.books?.map((book: TBook) => (
				<Card
					key={book._id}
					className="overflow-hidden relative transition-shadow duration-300 hover:shadow-lg"
				>
					<div className="absolute top-0 right-3">
						<span className="border inline-block p-2 rounded-md">delete</span>
					</div>
					<CardHeader className="p-0">
						<Link href={`/books/${book._id}`}>
							<Image
								height={256}
								width={200}
								src={book.image}
								alt={book.name}
								className="w-full h-64 object-cover"
							/>
						</Link>
					</CardHeader>
					<CardContent className="p-4">
						<CardTitle className="text-xl font-semibold mb-2 truncate">
							{book.name}
						</CardTitle>
						<p className="text-sm text-gray-600 mb-2">{book.authorName}</p>
						<p className="text-lg font-bold text-blue-600">${book.price.toFixed(2)}</p>
					</CardContent>
					<CardFooter className="p-4 pt-0">
						<Link href={`/books/${book._id}`} className="w-full">
							<Button className="w-full bg-[#ff7272]">Add to Cart</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
			<Link href="/books/add">
				<div className="w-[60px] h-[60px] bg-blue-500 flex items-center justify-center text-white rounded-full fixed bottom-4 right-4">
					<Plus />
				</div>
			</Link>
		</div>
	);
}
