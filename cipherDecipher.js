const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key =  'idontknow';

module.exports.encrypt =  (data) => {
    let cipher = crypto.createCipher(algorithm,key);
    let encrypted = cipher.update(data, 'utf8','hex');
    encrypted+=cipher.final('hex');
    console.log('Encrypt -->',encrypted.toString('hex'));
    return encrypted.toString('hex');
}

module.exports.decrypt = (data) => {
    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted+=decipher.final('utf8');
    console.log('Decrypt-->',decrypted);
    return decrypted;
}

