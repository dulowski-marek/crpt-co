import { EncryptCommand } from './EncryptCommand';
import { EncryptRepository } from './EncryptRepository';
import { EncryptResult } from './EncryptResult';

export class EncryptInteractor {
    constructor(
        private readonly repository: EncryptRepository,
    ) { }

    public handle({ publicKey }: EncryptCommand): EncryptResult {
        return this.repository.store(publicKey);
    }
}