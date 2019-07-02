const jwt  = require('jsonwebtoken');
const moment = require('moment');
let secretkey = 'idfdfjnjnj';
const {decrypt} = require('./cipherDecipher')

module.exports.generateToken = (data) => {
    console.log('Trying to generate token',decrypt(data.emailId))
    var email = decrypt(data.emailId);
    var id = decrypt(data.userId)
    return new Promise((resolve, reject) => {
        try{
            
            let claim = {
                userId: id,
                expAt: moment(moment(),'LLLL').add(1,'days'),
                emailId: email
            }
            let token = jwt.sign(claim, secretkey);
            resolve(token);
        }catch(err){
            reject(err);
        }
    });
}

module.exports.decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        console.log('Token Lib-->',token)
        jwt.verify(token, secretkey, (err, decoded)=>{
            if(err){
                reject(err);
            }else {
                resolve(decoded);
            }
        })
    })  
}

module.exports.verifyClaimWithoutSecret = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token,secretkey, (err, decoded) => {
            if(err){
                reject(err);
            }else {
                resolve(decoded);
            }
        });
    });
}



// module.exports = {secretkey};    
