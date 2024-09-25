import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/actions/book.actions";
import { TBook } from "../../../types";

export default async function PopularBooks() {
	const booksInfo = await getAllBooks();
	const favBooks = booksInfo.books?.slice(0, 4);

	return (
		<section className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Popular Books</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{favBooks.map((book: TBook) => (
						<Card
							key={book._id}
							className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
						>
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
								<p className="text-lg font-bold text-blue-600">
									${book.price.toFixed(2)}
								</p>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Link href={`/books/${book._id}`} className="w-full">
									<Button className="w-full bg-[#ff7272]">Add to Cart</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
				<div className="text-center mt-10">
					<Link href="/books">
						<Button className="px-8">Show all books</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
