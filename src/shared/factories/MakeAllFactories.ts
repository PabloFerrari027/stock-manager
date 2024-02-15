import MakeCategoriesRepository from "modules/categories/factories/MakeCategoriesRepository";
import ICategoriesRepository from "modules/categories/repositories/ICategoriesRepository";
import "reflect-metadata";

import { container, singleton } from "tsyringe";

@singleton()
export default class MakeAllFactories {
  private static type: "test" | "test-e2e" | "dev" | "production";
  private static _CategoriesRepository: ICategoriesRepository;

  static CategoriesRepository(): ICategoriesRepository {
    return this._CategoriesRepository;
  }

  private static makeCategoriesRepository(): void {
    const makeCategoriesRepository = container.resolve(
      MakeCategoriesRepository,
    );

    const type =
      this.type === "test" || this.type === "test-e2e" ? "fake" : "production";

    const provider = makeCategoriesRepository.execute({
      type,
    });

    this._CategoriesRepository = provider;
  }

  static execute(): void {
    this.type = `${process.env.NODE_ENV}` as
      | "test"
      | "test-e2e"
      | "dev"
      | "production";

    this.makeCategoriesRepository();
  }
}

MakeAllFactories.execute();
