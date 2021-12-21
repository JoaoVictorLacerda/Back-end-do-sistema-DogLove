const repository = require('../repositories/MatchRepository');

class DogController{

    async post(request, response) {
        const resultado = await repository.createMatch(request.body)

        if(resultado === true){
            return response.status(200).json({ message: "Match cadastrado!" });
        }
        else{
            return response.status(400).json({ message: "Não foi possivel cadastrar seu Match"}); 
        }
    }

    async get(request, response){
        const result = await repository.readMatch();
        return response.status(201).json(result); 
    }

    async getById(request, response){
        const {id} = request.query;
        if(!id){
            return response.status(400).json({message: "digite um id"}); 
        }
        const fullUrl = request.protocol + '://' + request.get('Host');
        const result = await repository.findById(id, fullUrl)
        return response.status(302).json(result); 
    }

    async deleteById(request, response){
        const {id} = request.query;
        if(!id){
            return response.status(400).json({message: "digite um id"}); 
        }
        const result = await repository.deleteById(id)
        if(!result){
            return response.status(400).json({message:"Match já excluido ou algo deu errado"}); 
        }
        return response.status(200).json({message:"excluido com sucesso"}); 

    }

    async enviarEmail(request, response){

        const envioDeEmailService = require('../services/EnvioDeEmailService')
        try {
            await envioDeEmailService.envioDeEmail(request.body)
            return response.status(200).json({message:"Enviado"}); 
        } catch (error) {
            return response.status(400).json({message:error}); 
        }
    }

}
module.exports= new DogController();