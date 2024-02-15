import UniqueIDEntity from "./UniqueIDEntity";

export default class Entity<props> {
  private _id: number;
  protected props: props;

  get id(): number {
    return this._id;
  }

  constructor(props: props, id?: number) {
    this.props = props;

    const uniqueIDEntity = new UniqueIDEntity(id);

    this._id = uniqueIDEntity.id;
  }
}
