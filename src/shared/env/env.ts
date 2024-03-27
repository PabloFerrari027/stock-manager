import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
});

const response = envSchema.safeParse(process.env);

if (!response.success) {
	const message = response.error.formErrors.fieldErrors;

	throw new Error(`${message}`);
}

export default response.data;
