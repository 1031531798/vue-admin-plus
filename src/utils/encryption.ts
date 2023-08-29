import AES from "crypto-js/aes.js";
import UTF8 from "crypto-js/enc-utf8.js";
import CryptoJS from "crypto-js";
import md5 from "crypto-js/md5.js";
import Base64 from 'crypto-js/enc-base64.js';

export interface EncryptionParams {
  key: string;
  iv: string;
}


export class AesEncryption {
  private iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key } = opt;
    if (key) {
      this.iv = CryptoJS.enc.Latin1.parse(key);
    }
  }

  get getOptions() {
    return {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
      iv: this.iv,
    };
  }

  // AES 加密
  encryptByAES(cipherText: string, isBase64: boolean = false) {
    const value = AES.encrypt(cipherText, this.iv || "", this.getOptions).toString()
    return isBase64 ? btoa(value) : value;
  }

  // AES 解密
  decryptByAES(cipherText: string, isBase64: boolean = false) {
    const decrypt =  AES.decrypt(isBase64 ? atob(cipherText) : cipherText, this.iv || "", this.getOptions)
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}
