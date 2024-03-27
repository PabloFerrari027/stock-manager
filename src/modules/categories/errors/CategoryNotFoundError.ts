export default class CategoryNotFoundError extends Error {
	status: number;

	constructor(message: string) {
		super(message);
		this.status = 404;
	}

	static id(id: string): void {
		const message = `The category with ID ${id} was not found!`;
		new CategoryNotFoundError(message);
	}

	static SKUPrefix(SKUPrefix: string): void {
		const message = `The category with SKU prefix ${SKUPrefix} was not found!`;

		new CategoryNotFoundError(message);
	}
}
