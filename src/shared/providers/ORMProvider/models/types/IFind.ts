import Model from "./Model";

export default interface IFind<T> {
  data: T;
  key: keyof T;
  model: Model;
}
