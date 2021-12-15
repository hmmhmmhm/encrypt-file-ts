/// <reference types="node" />
import crypto from 'crypto-js';
import forge from 'node-forge';
import { CipherOption } from './utils';
export declare const encryptAES: (buffer: Buffer, secret: string | crypto.lib.WordArray, config?: CipherOption | undefined) => Buffer;
export declare const decryptAES: (buffer: Buffer, secret: string | crypto.lib.WordArray, config?: CipherOption | undefined) => Buffer;
export declare const encryptRabbit: (buffer: Buffer, secret: string | crypto.lib.WordArray, config?: CipherOption | undefined) => Buffer;
export declare const decryptRabbit: (buffer: Buffer, secret: string | crypto.lib.WordArray, config?: CipherOption | undefined) => Buffer;
export declare const encryptPKI: (buffer: Buffer, publicKey: string) => Buffer;
export declare const decryptPKI: (encrypted: Buffer, privateKey: string) => Buffer;
export declare const generatePKIKeyPair: (options?: forge.pki.rsa.GenerateKeyPairOptions) => Promise<{
    publicKey: string;
    privateKey: string;
} | undefined>;
