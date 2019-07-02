const prompts = require('prompts');
const axios = require('axios');
const random = require('randomatic');
const crypto = require('crypto');
const {encrypt, decrypt} = require('./cipherDecipher');


(async () => {
    const resp = await prompts({
        type: 'number',
        name:'userInput',
        message: 'Please enter the number of times you want to hit the Signup API',
        validate: userInput => userInput < 1 ? 'Please enter a number': true
    });
    let apiHitTimes = resp.userInput;

    let val = encrypt('Subhro chatterjee');
    console.log('Encrypt---->', val);

    console.log('Decrypt ---->',decrypt(val));
    for(let hits = 0 ;hits< apiHitTimes; hits++){
        let formData = {
            emailId:random('Aa0',8)+'@gmail.com',
            password:random('Aa0',10),
            name:random('Aa0',12)
        }
        axios({
            method: 'post',
            url:'http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/signup',
            data:formData
            })
            .then((resp)=>{
                console.log(resp.data);
            }).catch((err)=>{
                console.log(err);
            });
    }//End For
    
    axios.get('http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/hello')
        .then((resp)=>{
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        });
})();
