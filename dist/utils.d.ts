/// <reference types="node" />
export declare const wordArrayToUint8Array: (wordArray: CryptoJS.lib.WordArray) => Uint8Array;
export declare const makeBufferChunks: (buffer: Buffer, chunkSize: number) => Buffer[];
/**
 * Configuration options.
 */
export interface CipherOption {
    /**
     * The IV to use for this operation.
     */
    iv?: CryptoJS.lib.WordArray | undefined;
    format?: typeof CryptoJS.format.Hex | undefined;
    [key: string]: any;
}
