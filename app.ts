import express, { Router } from 'express';
import log from './log';
import { EncryptInteractor } from './interactors/Encrypt/EncryptInteractor';
import { InMemoryEncryptRepository } from './repositories/EncryptRepository/InMemoryEncryptRepository';
import expressWinston from 'express-winston';
import ejs from 'ejs';
import fs from 'fs';

import { json } from 'body-parser';

const app = express();
const port = 8080;

const encryptRepository = new InMemoryEncryptRepository();
const encryptInteractor = new EncryptInteractor(encryptRepository);

const tpl = ejs.compile(fs.readFileSync(`www/encrypt/index.ejs`).toString(`utf8`));

app.use(`/`, express.static(`www`));
app.use(`/encrypt/:id`, (req, res, next) => {
    const result = encryptRepository.get(req.params[`id`]);

    log.info(result)
    log.info(tpl({ publicKey: result.publicKey }))

    res.status(200).write(tpl({ publicKey: result.publicKey }));

    res.end();
});

app.use(expressWinston.logger({
    winstonInstance: log,
}));

app.use(`/api/v1/encrypt`, Router()
    .get(`/:id`, (req, res, next) => {
        const result = encryptRepository.get(req.params[`id`]);

        res.status(200).json(result);
    })
    .post(`/`, json(), (req, res, next) => {
        const result = encryptInteractor.handle({
            publicKey: req.body.publicKey,
        });

        res.status(200).json(result);
    }))

app.listen(port, () => {
    log.info(`Listening on ${port}`);
});