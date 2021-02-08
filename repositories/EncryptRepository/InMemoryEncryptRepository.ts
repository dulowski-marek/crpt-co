import { v4 as uuid } from 'uuid';
import log from '../../log';

import { EncryptRepository } from '../../interactors/Encrypt/EncryptRepository';
import { EncryptResult } from '../../interactors/Encrypt/EncryptResult';

export class InMemoryEncryptRepository implements EncryptRepository {
    constructor(
        private readonly map = new Map<string, string>(),
    ) { }

    store(publicKey: string): EncryptResult {
        const id = uuid();
        log.info(`Store`, { id, publicKey });

        this.map.set(id, publicKey);

        return {
            id,
            publicKey,
        };
    }

    get(id: string): EncryptResult {
        const publicKey = this.map.get(id);
        log.info(Array.from(this.map))

        if (publicKey === undefined) {
            throw new Error(`No Encrypt with id ${id}`);
        }

        return {
            publicKey,
            id,
        };
    }
}
