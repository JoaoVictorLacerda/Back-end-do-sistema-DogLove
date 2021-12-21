const {v4: uuid} = require('uuid');
const Favorites = require('../models/Favorites')
const logService = require('../services/LogService')

class FavoritesRepository{
    async create (data){
        const {
            _idUser,
        } = data;

        const newFavorites = new Favorites({
            _id: uuid(),
            _idUser,
        });

        try{
           await newFavorites.save();
            return true;

        }catch(err){
         logService('FavoritesRepository/create','Ocorreu um erro ao favoritar', false)
         return false;
        }
    }

    async read(){
        const favorites = await Favorites.find();
        return favorites; 
    }

    async readOne(_idUser){
        const favorites = await Favorites.findOne({_idUser:_idUser});
        console.log(favorites)
        return favorites; 
    }

    async update(data){
        try{
            const favorito = await Favorites.findOneAndUpdate({_idUser:data._idUser},{
                $addToSet:{
                    _idDogs: data._idDogs
                } 
            });
            return true
        }catch(error){
            logService('FavoritesRepository/update','Deu erro aqui',false)
            return false
        }
    }

    async delete(data){
        const resultado = await Favorites.findOneAndUpdate({_idUser:data._idUser},{
            $pull:{
                _idDogs: data._idDog
            }
        });
        let retorno = resultado._idDogs.deletedCount == 0? false :true;
        return retorno;
    }

    async deleteAll(id){
        const resultado = await Favorites.deleteOne({ _id:id });
        let retorno = resultado.deletedCount == 0? false :true;
        return retorno;
    }
    
}
module.exports = new FavoritesRepository();