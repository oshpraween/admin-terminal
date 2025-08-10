import SHA256 from 'crypto-js/sha256';
import SHA1 from 'crypto-js/sha1';
import SHA3 from 'crypto-js/sha3';
import SHA224 from 'crypto-js/sha224';
import SHA384 from 'crypto-js/sha384';
import RIPEMD160 from 'crypto-js/ripemd160';
import MD5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';
import * as forge from 'node-forge';

import { EncryptionMethods } from 'src/enum/common';
import { Settings } from 'src/settings/settings';

export class EncryptionUtil {
  static getHashMessage(
    message: string,
    encryptionMethods: EncryptionMethods,
    salt?: string
  ): string | null {
    if (Settings.isSaltedPassword) {
      return this.generateHashCode(
        this.generateHashCode(message, encryptionMethods)! +
          (salt ? salt.toUpperCase() : ''),
        encryptionMethods
      );
    }
    return this.generateHashCode(message, encryptionMethods);
  }

  static generateHashCode(
    message: string,
    encryptionMethods: EncryptionMethods
  ): string | null {
    let encryptedMessage: string | null = null;
    try {
      switch (encryptionMethods) {
        case EncryptionMethods.MD5:
          encryptedMessage = MD5(message).toString();
          break;
        case EncryptionMethods.SHA1:
          encryptedMessage = SHA1(message).toString(Base64);
          break;
        case EncryptionMethods.SHA256:
          encryptedMessage = SHA256(message).toString();
          break;
        case EncryptionMethods.SHA224:
          encryptedMessage = SHA224(message).toString();
          break;
        case EncryptionMethods.SHA3:
          encryptedMessage = SHA3(message).toString();
          break;
        case EncryptionMethods.SHA384:
          encryptedMessage = SHA384(message).toString();
          break;
        case EncryptionMethods.RIPEMD160:
          encryptedMessage = RIPEMD160(message).toString();
          break;
        default:
          encryptedMessage = SHA256(message).toString();
          break;
      }
    } catch (e) {
      console.log('Error hashing message' + e);
    }
    return encryptedMessage;
  }

  static rsaEncryptWitBase64Encode(): string {
    return forge.util.encode64(
      `ZJMXUWaGfHA8mrzDDWEmYUNxI5mCTAJtJzHl8p/fUJfUZwmDXXT1kTJDBirsMykzpWTf1vU6wB+8g63MoqcTfFbq4euJXRrAIb9kTgRVbb1Cm0z1+S1kclsa5a+1fSXUnJUtokk7nXmd4SnxOp/cM3sL565rzHBfhosOA5mD+9k=`
    );
  }
}
