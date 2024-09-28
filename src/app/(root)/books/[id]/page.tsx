import CheckoutForm from "@/components/shared/CheckoutForm";
import { TBook } from "../../../../../types";
import { secret } from "@/config";
import { getSingleBook } from "@/lib/actions/book.actions";
import PopularBooks from "@/components/shared/PopularBooks";

export async function generateStaticParams() {
	const booksInfo = await fetch(`${secret.baseUrl}/book`).then((res) => res.json());

	return booksInfo.books?.map((book: TBook) => ({
		id: book._id,
	}));
}

export default async function SingleBook({ params }: { params: { id: string } }) {
	const singleBook = await getSingleBook(params.id);

	return (
		<div>
			<CheckoutForm book={singleBook.book} />
			<PopularBooks heading="Related Books" />
		</div>
	);
}
