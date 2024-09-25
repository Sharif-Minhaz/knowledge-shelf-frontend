interface IError extends Error {
	status?: number;
}

const throwError = (message: string, status: number) => {
	const error: IError = new Error(message);
	error.status = status;

	throw error;
};

export const handleError = (error: unknown, status: number = 500) => {
	console.error(error);
	if (error instanceof Error) {
		throwError(error.message, status);
	} else {
		throwError("Internal server error", 500);
	}
};
