const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    
    idUserOne:{
        type:String,
        required: true 
    },
    idDogOne:{
        type:String,
        required: true
    },



    idUserTwo:{
        type:String,
        default: null,
        required: false
    },
    idDogTwo:{
        type:String,
        default: null,
        required: false
    }

   
});
module.exports = mongoose.model("Match", dogSchema);