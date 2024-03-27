export default class Either<L, R> {
	private constructor(
		private leftValue: L | null,
		private rightValue: R | null,
	) {}

	static left<L>(value: L): Either<L, null> {
		return new Either(value, null);
	}

	static right<R>(value: R): Either<null, R> {
		return new Either(null, value);
	}

	isLeft(): boolean {
		return this.leftValue !== null;
	}

	isRight(): boolean {
		return this.rightValue !== null;
	}

	Left(): L | null {
		return this.leftValue;
	}

	Right(): R | null {
		return this.rightValue;
	}
}
