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


