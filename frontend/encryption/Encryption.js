import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

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
    const secretKey = nacl.randomBytes(32);
    const nonce = nacl.randomBytes(24); 
    key_nonce['key'] = secretKey; 
    key_nonce['nonce'] = nonce; 
    return key_nonce; 
}
export function encrypt_message(message, key, nonce){
    decoded_message = nacl.util.decodeUTF8(message)
    return nacl.secretbox(decoded_message, nonce, key);
}

