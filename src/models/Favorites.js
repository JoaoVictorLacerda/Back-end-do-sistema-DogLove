const mongoose = require('mongoose');
const FavotiresSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    _idUser:{
        type:String,
        required: true
    },
    _idDogs:{
        type:Array,
        default:[]
    }
})
module.exports = mongoose.model("Favorites", FavotiresSchema);