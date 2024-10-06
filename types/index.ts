export type TBook = {
	_id: string;
	name: string;
	image: string;
	imagekey: string;
	publishedDate: string;
	authorName: string;
	stock: number;
	description: string;
	price: number;
	createdAt: string;
	addedBy: string;
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

export type TLoginParams = {
	email: string;
	password: string;
};

export type TRegistrationParams = {
	email: string;
	password: string;
	fullName: string;
};

export type TUser = {
	_id: string;
	fullName: string;
	email: string;
	avatar: string;
	role: string;
	type?: string;
	iat?: Date;
	exp?: Date;
};

export interface IRegistrationRes extends TUser {
	success: boolean;
	message: string;
}

export interface ILoginRes extends TUser {
	success: boolean;
	message: string | string[];
	accessToken: string;
	refreshToken: string;
}

export interface IOrderHistory {
	_id: string;
	bookId: TBook;
	orderName: string;
	quantity: number;
	total: number;
	phoneNumber: string;
	address: string;
	tranxId: string;
}

export interface IProfileData {
	success: boolean;
	user: TUser;
	history: IOrderHistory[];
}
