import CategoryEntity from '@modules/categories/entities/CategoryEntity';

export default interface IFindBySKUPrefixResponse {
	category: CategoryEntity | null;
}
