import { ICount, ICreate, IDelete, IFind, IList, IUpdate } from "./types";

export default interface IORMProvider {
  count<T>(data: ICount<T>): Promise<number>;
  create<T, D>(data: ICreate<D>): Promise<T>;
  update<T, D>(data: IUpdate<D>): Promise<T>;
  find<T, D>(data: IFind<D>): Promise<T>;
  list<T, D>(data: IList<D>): Promise<T>;
  delete(data: IDelete): Promise<void>;
}
