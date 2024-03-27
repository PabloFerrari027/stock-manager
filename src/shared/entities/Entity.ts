import UniqueIDEntity from './UniqueIDEntity';

export default class Entity<props> {
	private _id: string;
	protected props: props;

	get id(): string {
		return this._id;
	}

	constructor(props: props, id?: string) {
		this.props = props;

		const uniqueIDEntity = new UniqueIDEntity(id);

		this._id = uniqueIDEntity.id;
	}
}
