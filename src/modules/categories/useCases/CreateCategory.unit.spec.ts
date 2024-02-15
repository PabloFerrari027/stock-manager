import { beforeEach, describe, test } from "vitest";

import CreateCategory from "./CreateCategory";

let createCategory: CreateCategory;

beforeEach(() => {
  createCategory = new CreateCategory();
});

describe("Test", () => {
  test("", async () => {
    const { category } = await createCategory.execute({
      name: "",
      SKUPrefix: "",
    });

    const id = category.id;
  });
});
