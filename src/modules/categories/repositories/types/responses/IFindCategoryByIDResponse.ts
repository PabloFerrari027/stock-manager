import CategoryEntity from '@modules/categories/entities/CategoryEntity';

export default interface IFindCategoryByIDResponse {
	category: CategoryEntity | null;
}
