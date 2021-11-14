import express from 'express';
import { config } from './config';

const app = express();
const port = config.port;

app.get('/', (_req, res) => {
	res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
