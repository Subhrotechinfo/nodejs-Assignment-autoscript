var bcrypt = require('bcrypt');
let saltRounds = 10;

module.exports.hashData = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

module.exports.compareData = (oldPassword, hashPassword)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(oldPassword, hashPassword, (err, result)=>{
            if(err){
                console.log('Error in comparison');
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}











