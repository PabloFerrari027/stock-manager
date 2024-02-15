import CategoryEntity from '../entities/CategoryEntity';

interface ICreateCategory {
  name: string;
  SKUPrefix: string;
}

interface ICreateCategoryResponse {
  category: CategoryEntity;
}

export default class CreateCategory {
  async execute(data: ICreateCategory): Promise<ICreateCategoryResponse> {
    const category = CategoryEntity.create(data);

    return { category };
  }
}
