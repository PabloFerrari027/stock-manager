import Model from "./Model";

export default interface IUpdate<T> {
  data: T;
  id: number;
  model: Model;
}
