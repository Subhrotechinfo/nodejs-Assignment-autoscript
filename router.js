const express = require('express');
const mongoose =require('mongoose'); 
const {Email, Password} = require('./inputValidator');
var router  = express.Router();
const randomize  = require('randomatic');
const {hashData, compareData} = require('./bcrypt');
const {isEmpty}  = require('./check');
const {generateToken, decodeToken} = require('./token');
const {encrypt, decrypt} = require('./cipherDecipher');
var user = require('./userModel');
let UserModel = mongoose.model('User');
//SignUp API
router.post('/signup', (req, res) => {
    var uniqueId  = randomize('0', 4);
    let userInputValidator = () =>{
        return new Promise((resolve, reject)=>{
            if(req.body.emailId&& req.body.name){
                if(!Email(req.body.emailId)){
                    reject('Email does not met the requirement');
                }else if(isEmpty(req.body.password)){
                    reject('password parameter is missing');
                }else if(!Password(req.body.password)) {
                    reject('password must be min 8 character')
                } 
                else{
                    resolve(req);
                }
            } else {
                // console.log('Field missing userController(): createUser');
                reject('One or more paratemer(s) is missing');
            }
        });
    } //end validateUserInput
    
    //Exclusively checking for the id that is generated already exist or not
    let checkUserIfExist = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({userId:encrypt(uniqueId)})
                .exec()
                .then((userFound)=>{
                    if(isEmpty(userFound)){
                        console.log('resolve unique id');
                        resolve(req);
                    }else {
                        reject('Same id has been generated again');
                    }
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    let userCreate  = () => {   
        return new Promise((resolve,reject)=>{
            UserModel.findOne({emailId: encrypt(req.body.emailId)})
                .exec()
                .then((retrievedUserDetails)=>{
                    if(isEmpty(retrievedUserDetails)){
                        let newUser = new UserModel({
                            userId: encrypt(uniqueId),
                            name: encrypt(req.body.name),
                            emailId: encrypt(req.body.emailId),
                            password: hashData(req.body.password)
                        })
                        newUser.save()
                            .then((newUser)=> {
                                // newUser = decrypt(newUser);
                                console.log('saved user',newUser);
                                if(!isEmpty(newUser)){
                                    delete newUser.password;
                                    newUser.userId = decrypt(newUser.userId);
                                    newUser.emailId = decrypt(newUser.emailId);
                                    newUser.name = decrypt(newUser.name);
                                    resolve(newUser)
                                } else {
                                    reject(generatejson(true, 'Something went wrong while saving the data.'));
                                    
                                }
                            })
                            .catch((err) => {
                                reject(err)
                            });
                    }else {
                        console.log('User cannot be created. User is already present UserController: createUser');
                        reject('User already present with this email id.');
                    }
                })
        });
    }

    userInputValidator(req,res)
        .then(checkUserIfExist)
        .then(userCreate)
        .then((data) => {
            // delete data.__v;
            console.log('User Created SignUpUser: Controller');
            res.status(200).json({msg:'User Created', data: data});
        })
        .catch((err) => {
            res.status(200).send(err);
        });
})

//Signin API
router.post('/signin', (req, res)=>{
    let findUser = () => {
        return new Promise((resolve,reject)=>{
            if(req.body.emailId) {
                if(Email(req.body.emailId)){
                    UserModel.findOne({emailId: encrypt(req.body.emailId)})
                        .exec()
                        .then((userDetails)=>{
                            if(isEmpty(userDetails)){
                                reject('User details not found with the email id')
                            }else {
                                resolve(userDetails);
                            }
                        })
                        .catch((err)=>{
                            reject('something went wrong while fetching the details');
                        });
                }else {
                    reject({err:'invalid emailid format'});
                }
                
            }else {
                reject('email parameter is missing');
            }
        });
    } //find user end
    
    let passwordValidator = (retrievedUserDetail) => {
        return new Promise((resolve,reject)=>{
            if(req.body.password){
                compareData(req.body.password, retrievedUserDetail.password)
                .then((isMatch) => {
                    if(isMatch){
                        console.log(retrievedUserDetail)
                        resolve(retrievedUserDetail);
                    }else {
                        reject('wrong password');
                    }
                })
                .catch((err) => {
                    reject(err)
                });
            }else {
                reject({err:'password field is missing'});
            }
        });
    }//password validator end 

    let tokenGenerate = (retrievedUser) => {
        return new Promise((resolve, reject)=>{
            generateToken(retrievedUser)
            .then((tokenDetail)=>{
                resolve(tokenDetail);
            })
            .catch((err)=>{
                reject(err);
            })
        })        
    }

    findUser(req,res)
        .then(passwordValidator)
        .then(tokenGenerate)
        .then((loggedinUserToken) => {
            res.status(200).json({msg: 'login success', data: loggedinUserToken});
        })
        .catch((err) => {
            res.status(200).json({err:err});
        });
});

//Get API
router.post('/getUserProfile', (req, res) => {
    let userToken = () =>{
        return new Promise((resolve, reject) => {
            if(req.headers.authorization){
                resolve(req.headers.authorization);
            }else {
                reject('Token is missing');
            }
        });
    }

    let decodeTokenUser = (requestToken) => {
        console.log('Decode', requestToken)
        return new Promise((resolve, reject)=>{
            decodeToken(requestToken)
                .then((decoded)=>{
                    console.log('decodes',decoded);
                    delete decoded.iat;
                    delete decoded.expAt;
                    console.log('Decoded user id from token',decoded.userId)
                    resolve(decoded.userId);
                })
                .catch((err)=>{
                    reject(err)
                });
        });
    }

    let findUser = (userid) => {
        console.log('userid', userid);
        return new Promise((resolve, reject) => {
            UserModel.findOne({userId: encrypt(userid)})
            .select('-password -__v -_id')
            .lean()
            .then((userDetails)=>{
                if(isEmpty(userDetails)){
                    reject({err: true, msg: 'no user found'});
                }else {
                    userDetails.userId = decrypt(userDetails.userId)
                    userDetails.name = decrypt(userDetails.name)
                    userDetails.emailId = decrypt(userDetails.emailId)
                    resolve(userDetails);
                }
            }).catch((err)=>{
                reject({err:err});
            })
        });
    }

    userToken(req, res)
        .then(decodeTokenUser)
        .then(findUser)
        .then((foundUser)=>{
            res.status(200).json({msg:'success', data: foundUser});
        }).catch((err)=>{
            res.send(err);
        });
})

module.exports = router;

