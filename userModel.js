var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:'',
        index:true
    },
    name:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);










