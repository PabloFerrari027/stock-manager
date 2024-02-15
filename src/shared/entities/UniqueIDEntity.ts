export default class UniqueIDEntity {
  protected _id: number;

  get id(): number {
    return this._id;
  }

  constructor(id?: number) {
    this._id = id ?? 0;
  }
}
