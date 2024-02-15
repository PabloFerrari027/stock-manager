import Model from "./Model";

export default interface IList<T> {
  take?: number;
  skip?: number;
  key?: keyof T;
  data?: T;
  model: Model;
}
