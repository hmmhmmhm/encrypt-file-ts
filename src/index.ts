import crypto from 'crypto-js'
import forge from 'node-forge'
import { CipherOption, makeBufferChunks, wordArrayToUint8Array } from './utils'

export const encryptAES = (
  buffer: Buffer,
  secret: string | crypto.lib.WordArray,
  config?: CipherOption
) => {
  const wordArray = crypto.lib.WordArray.create(buffer as unknown as number[])
  const encrypted = crypto.AES.encrypt(wordArray, secret, config)
  return Buffer.from(encrypted.toString())
}

export const decryptAES = (
  buffer: Buffer,
  secret: string | crypto.lib.WordArray,
  config?: CipherOption
) => {
  const wordArray = crypto.AES.decrypt(String(buffer), secret, config)
  return Buffer.from(wordArrayToUint8Array(wordArray))
}

export const encryptRabbit = (
  buffer: Buffer,
  secret: string | crypto.lib.WordArray,
  config?: CipherOption
) => {
  const wordArray = crypto.lib.WordArray.create(buffer as unknown as number[])
  const encrypted = crypto.Rabbit.encrypt(wordArray, secret, config)
  return Buffer.from(encrypted.toString())
}

export const decryptRabbit = (
  buffer: Buffer,
  secret: string | crypto.lib.WordArray,
  config?: CipherOption
) => {
  const wordArray = crypto.Rabbit.decrypt(String(buffer), secret, config)
  return Buffer.from(wordArrayToUint8Array(wordArray))
}

const _encryptPKI = (buffer: Buffer, publicKey: string) => {
  return Buffer.from(
    forge.pki
      .publicKeyFromPem(publicKey)
      .encrypt(forge.util.encodeUtf8(buffer.toString('base64')))
  )
}

export const encryptPKI = (buffer: Buffer, publicKey: string) => {
  const chunks = makeBufferChunks(buffer, 183)
    .map((chunk) => _encryptPKI(chunk, publicKey).toString('base64'))
    .join(',')
  return Buffer.from(chunks)
}

const _decryptPKI = (encrypted: Buffer, privateKey: string) => {
  return Buffer.from(
    forge.pki.privateKeyFromPem(privateKey).decrypt(encrypted.toString()),
    'base64'
  )
}

export const decryptPKI = (encrypted: Buffer, privateKey: string) => {
  const chunks = encrypted
    .toString()
    .split(',')
    .map((chunk) => _decryptPKI(Buffer.from(chunk, 'base64'), privateKey))
  return Buffer.concat(chunks)
}

export const generatePKIKeyPair = (
  options: forge.pki.rsa.GenerateKeyPairOptions = {
    bits: 2048,
    workers: 2,
    e: 0x10001
  }
): Promise<
  | {
      publicKey: string
      privateKey: string
    }
  | undefined
> => {
  return new Promise((resolve) => {
    forge.pki.rsa.generateKeyPair(options, (error, keypair) => {
      if (error) {
        resolve(undefined)
      } else {
        resolve({
          publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
          privateKey: forge.pki.privateKeyToPem(keypair.privateKey)
        })
      }
    })
  })
}
