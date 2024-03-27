import 'reflect-metadata';
import MakeAllFactories from '../factories/MakeAllFactories';
import { container } from 'tsyringe';
import { beforeEach } from 'vitest';

beforeEach(async () => {
	container.clearInstances();
	MakeAllFactories.execute();
});
