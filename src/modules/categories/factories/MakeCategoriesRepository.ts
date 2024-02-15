import "reflect-metadata";
import { container, singleton } from "tsyringe";
import CategoriesRepository from "../infra/databases/CategoriesRepository";
import InMemoryCategoriesRepository from "../infra/databases/InMemoryCategoriesRepository";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

interface IMakeCategoriesRepository {
  type: "fake" | "production";
}

@singleton()
export default class MakeCategoriesRepository {
  public execute(data?: IMakeCategoriesRepository): ICategoriesRepository {
    const type = data?.type || "production";

    if (type === "fake") {
      const repository = container.resolve(InMemoryCategoriesRepository);

      container.registerInstance<ICategoriesRepository>(
        "CategoriesRepository",
        repository,
      );

      return repository;
    }

    const repository = container.resolve(CategoriesRepository);

    container.registerInstance<ICategoriesRepository>(
      "CategoriesRepository",
      repository,
    );

    return repository;
  }
}
