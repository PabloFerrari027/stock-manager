import MakeAllFactories from "@shared/factories/MakeAllFactories";
import "reflect-metadata";
import { container } from "tsyringe";
import { beforeEach } from "vitest";

beforeEach(async () => {
  container.clearInstances();
  MakeAllFactories.execute();
});
