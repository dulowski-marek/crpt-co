import { EncryptResult } from './EncryptResult';

export interface EncryptRepository {
    store(publicKey: string): EncryptResult;
    get(id: string): EncryptResult;
}