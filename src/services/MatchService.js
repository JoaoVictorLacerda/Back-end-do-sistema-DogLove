const log = require('./LogService');

exports.authorizeMatch = async (request, response, next) =>{
    const match = request.body;

    const isEquals = equals(match);
    if(!isEquals){

        const isUserValidOne = await isUserValid(match.idUserOne);
        const isUserValidTwo = await isUserValid(match.idUserTwo);
        const isDogValidOne  = await isDogValid(match.idDogOne);
        const isDogValidTwo  = await isDogValid(match.idDogTwo);
        if(isUserValidOne && isUserValidTwo &&
            isDogValidOne && isDogValidTwo){
                log('MatchService/authorizeMatch','Passou', true)
                next()
        }else{
            return response.status(400).json({message:"Algo deu errado na sua requisição"});  
        }
    }else{
        return response.status(400).json({message:"Algo deu errado na sua requisição"}); 
    }
    
}

function equals(match){
    if(match.idUserOne === match.idUserTwo){
        log('MatchService/equals','Id iguais', false)
        return true;
    }
    if(match.idDogOne === match.idDogTwo){
        log('MatchService/equals','Dogs iguais', false)
        return true;
    }
    log('MatchService/equals','Liberado', true)
    return false;
}

async function isUserValid(id){
    const repository = require('../repositories/UserRepository');
    const user = await repository.getById(id)

    log('MatchService/isUserValid',user?'válido':'inválido',user?true:false )
    return user?true:false;
}
async function isDogValid(id){
    const repository = require('../repositories/DogRepository');
    const dog = await repository.getById(id);
    log('MatchService/isDogValid',dog?'válido':'inválido',dog?true:false )
    return dog?true:false;
}