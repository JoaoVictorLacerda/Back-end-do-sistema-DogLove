const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    district:{
        type:String,
        required: true
    }
});
module.exports = mongoose.model("User", userSchema);