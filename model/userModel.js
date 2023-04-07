const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    contact:[{
        contactName:{type: String},
        contactEmail:{type: String, unique: true},
        phones:[{ phoneNumber:{type: Number}, tag:{type: String}}]
    }],
    date:{
        type: Date,
        default: Date.now
    }
    
})

const UserModel = mongoose.model('Users', userSchema)
module.exports = UserModel;