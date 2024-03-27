import 'reflect-metadata';
import MakeAllFactories from '../factories/MakeAllFactories';
import { container } from 'tsyringe';
import { beforeEach } from 'vitest';
import prisma from '../infra/prisma/postgreSQL';

async function resetDB(): Promise<void> {
	await prisma.$transaction([prisma.categories.deleteMany()]);
}

beforeEach(async () => {
	await resetDB();
	container.clearInstances();
	MakeAllFactories.execute();
});
