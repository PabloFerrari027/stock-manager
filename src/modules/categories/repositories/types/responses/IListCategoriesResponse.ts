import CategoryEntity from '@modules/categories/entities/CategoryEntity';

export default interface IListCategoriesResponse {
	categories: CategoryEntity[];
	hasNext: boolean;
}
