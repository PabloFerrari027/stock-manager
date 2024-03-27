interface IErrorEntity {
	message: string;
	status: number;
}

export default class ErrorEntity {
	protected _message: string;
	protected _status: number;

	constructor(data: IErrorEntity) {
		this._message = data.message;
		this._status = data.status;
	}

	get message(): string {
		return this._message;
	}

	get status(): number {
		return this._status;
	}

	static create(data: IErrorEntity): ErrorEntity {
		const error = new ErrorEntity(data);
		return error;
	}
}
