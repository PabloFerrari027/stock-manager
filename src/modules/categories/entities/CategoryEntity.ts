import Entity from '@shared/entities/Entity';

interface IProps {
	name: string;
	isActive: boolean;
	SKUPrefix: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ICreateCategory {
	id?: string;
	name: string;
	SKUPrefix: string;
	isActive: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export default class CategoryEntity extends Entity<IProps> {
	get name(): string {
		return this.props.name;
	}

	get SKUPrefix(): string {
		return this.props.SKUPrefix;
	}

	get isActive(): boolean {
		return this.props.isActive;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}

	static create({ id, ...data }: ICreateCategory): CategoryEntity {
		const createdAt = data.createdAt || new Date();
		const updatedAt = data.createdAt || new Date();

		const category = new CategoryEntity(
			{
				...data,
				updatedAt,
				createdAt,
			},
			id,
		);

		return category;
	}
}
