const {v4: uuid} = require('uuid');
const Match = require('../models/Match');
const DogRepository = require('./DogRepository')
const log = require('../services/LogService')

class MatchRepository{


    async readMatch(){
        const matches = await Match.find();
        return matches;
    }
    async createMatch (data){
        const {
            idUserOne,
            idDogOne,
            idUserTwo,
            idDogTwo,
        } = data;
        
        const newMatch = new Match({
            _id: uuid(),
            idUserOne,
            idDogOne,
            idUserTwo,
            idDogTwo,
        });
        try{
            await newMatch.save();
            return true;
    
        }catch(err){
            log('MatchRepository/createMatch','Match não foi criado com sucesso', false)
            return false;
    
        }
    }

    async findById(id, fullUrl){
        let result = await Match.find({
            idUserOne: id
        })

        let dogs = []
        for (let i = 0; i < result.length; i++) {
            const dog = result[i];
            const dogDono = await DogRepository.getById(dog.idDogOne, fullUrl);
            const dogInteressado = await DogRepository.getById(dog.idDogTwo, fullUrl);
            
            const match = {
                dogDono:dogDono,
                dogInteressado:dogInteressado,
                id: dog._id,
            }
            dogs.push(match)
        }
        
        
        return dogs;
    }
    async deleteById(id){
        
        const result = await Match.findByIdAndDelete(id)
        console.log(result===null);
        return result === null? false: true
    }
    
}
module.exports = new MatchRepository();