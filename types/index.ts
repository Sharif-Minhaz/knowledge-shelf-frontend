export type TBook = {
	_id: string;
	name: string;
	image: string;
	publishedDate: string;
	authorName: string;
	stock: number;
	description: string;
	price: number;
	createdAt: string;
};

export type TAddBookData = {
	authorName: string;
	description: string;
	image: File;
	name: string;
	price: number;
	publishedDate: Date;
	stock: number;
};
