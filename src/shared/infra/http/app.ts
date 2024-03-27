import express from 'express';
import appRouters from './routers';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(appRouters);

export default app;
