import Model from "./Model";

export default interface ICount<T> {
  model: Model;
  data?: T;
  key?: keyof T;
}
