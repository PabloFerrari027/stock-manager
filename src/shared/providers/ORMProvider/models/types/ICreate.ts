import Model from "./Model";

export default interface ICreate<T> {
  data: T;
  model: Model;
}
