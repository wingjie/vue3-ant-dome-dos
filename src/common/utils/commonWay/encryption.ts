// eslint-disable-next-line import/no-extraneous-dependencies
import JSEncrypt from 'jsencrypt'
import { getPublicKey } from '@/common/utils/globalStore/index.js'

/**
 * @description 使用RSA公钥加密字符
 * @param { string } plaintext 需要加密的字符串
 * @return { string } encryptionText
 * */
export default function encryption(plaintext: string): string {
  const encryptor = new JSEncrypt()
  const publicKey = getPublicKey()
  let encryptString: any = ''
  if (publicKey) {
    encryptor.setPublicKey(publicKey)
    encryptString = encryptor.encrypt(plaintext)
    if (!encryptString) console.warn('[common-encryption]: Unable to encrypt')
  } else {
    console.warn('[common-encryption]: The public key was not obtained!')
  }
  return encryptString || plaintext
}
