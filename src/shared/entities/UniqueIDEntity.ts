import { randomUUID } from 'crypto';

export default class UniqueIDEntity {
	protected _id: string;

	get id(): string {
		return this._id;
	}

	constructor(id?: string) {
		this._id = id ?? randomUUID();
	}
}
