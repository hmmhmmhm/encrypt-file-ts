import { readFileSync } from 'fs'
import path from 'path'
import {
  decryptAES,
  decryptPKI,
  decryptRabbit,
  encryptAES,
  encryptPKI,
  encryptRabbit,
  generatePKIKeyPair
} from '../src'

describe('Test encrypt-file-ts', () => {
  const originBuffer = readFileSync(
    path.resolve(process.cwd(), 'package-lock.json')
  )
  const secret = 'secret'
  it('AES Test', () => {
    const encodedBuffer = encryptAES(originBuffer, secret)
    const decodedBuffer = decryptAES(encodedBuffer, secret)
    expect(originBuffer).toMatchObject(decodedBuffer)
  })

  it('Rabbit Test', () => {
    const encodedBuffer = encryptRabbit(originBuffer, secret)
    const decodedBuffer = decryptRabbit(encodedBuffer, secret)
    expect(originBuffer).toMatchObject(decodedBuffer)
  })

  it('PKI Test', async () => {
    const key = await generatePKIKeyPair()
    if (!key) throw new Error('Failed to generate key pair')
    if (key) {
      const newBuffer = Buffer.from(
        'newBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffernewBuffer'
      )
      const encodedBuffer = encryptPKI(newBuffer, key.publicKey)
      const decodedBuffer = decryptPKI(encodedBuffer, key.privateKey)
      expect(newBuffer).toMatchObject(decodedBuffer)
    }
  })
})
