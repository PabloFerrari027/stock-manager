/* eslint-disable no-console */
import env from '@shared/env/env';
import app from './app';

const port = env.PORT;

app.listen(port, () => {
	console.clear();
	console.log(`Server listening on port ${port}! 🔥`);
});
