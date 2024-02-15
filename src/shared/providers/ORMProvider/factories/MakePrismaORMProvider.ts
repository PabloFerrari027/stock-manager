MakePrismaORMProvider.ts;

import "reflect-metadata";
import { container, singleton } from "tsyringe";
import IORMProvider from "../models/IORMProvider";
import PrismaORMProvider from "../implementations/PrismaORMProvider";

@singleton()
export default class MakePrismaORMProvider {
  public execute(): IORMProvider {
    const provider = container.resolve(PrismaORMProvider);

    container.registerInstance<IORMProvider>("ORMProvider", provider);

    return provider;
  }
}
