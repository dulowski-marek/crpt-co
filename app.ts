import express from 'express';
import log from './log';

const app = express();
const port = 8080;

app.listen(port, () => {
    log.info(`Listening on ${port}`);
})