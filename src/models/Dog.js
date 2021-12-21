const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    _idUser:{
        type:String,
        required: true
    },
    nome:{
        type:String,
        required: true
    },
    sexo:{
        type:String,
        required: true
    },
    idade:{
        type:Number,
        required: true
    },
    raca:{
        type:String,
        required: true
    },
    descricao:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    img:{
        type:Buffer,
        required:true
    },
    imgContentType:{
        type:String,
        required:true
    },
    linkImg:{
        type:String,
        required:false
    },
    emailDono:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("Dog", dogSchema);