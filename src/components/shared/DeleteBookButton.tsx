import { deleteBook } from "@/lib/actions/book.actions";
import { Trash2 } from "lucide-react";

export default function DeleteBookButton({ bookId }: { bookId: string }) {
	const deleteBookWithId = deleteBook.bind(null, bookId);

	return (
		<div className="absolute top-3 right-3">
			<form action={deleteBookWithId}>
				<button
					type="submit"
					className="border inline-block p-2 rounded-md text-red-600 bg-white"
				>
					<Trash2 />
				</button>
			</form>
		</div>
	);
}
