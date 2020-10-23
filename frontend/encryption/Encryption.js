import nacl from 'tweetnacl'
import util from 'tweetnacl-util'
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from "tweetnacl-util";

const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);

export function generate_key_pair(){
    const keypair = nacl.box.keyPair();
    var keys = new Object();
    const receiverPublicKey = util.encodeBase64(keypair.publicKey);
    const receiverSecretKey = util.encodeBase64(keypair.secretKey);
    keys['public_key'] = receiverPublicKey;
    keys['private_key'] = receiverSecretKey; 
    return keys; 
}
export function generate_key_nonce(){
    var key_nonce = new Object();

    const secretKey = nacl.randomBytes(nacl.secretbox.keyLength);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    key_nonce['key'] = secretKey; 
    key_nonce['nonce'] = nonce; 
    return key_nonce; 
}
export function encrypt_message(message, key){
    var decoded_message = decodeUTF8(message)
    const nonce = newNonce();
    const box = nacl.secretbox(decoded_message, nonce, key)

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
}

export function decrypt_message(box, key){
    const messageWithNonceAsUint8Array = decodeBase64(box);
    const nonce = messageWithNonceAsUint8Array.slice(0, nacl.secretbox.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
        nacl.secretbox.nonceLength,
        box.length
    );
    const decrypted = nacl.secretbox.open(message, nonce, key);
    if (!decrypted) {
        throw new Error("Could not decrypt message");
    }
    const base64DecryptedMessage = encodeUTF8(decrypted);
    return base64DecryptedMessage;
}

