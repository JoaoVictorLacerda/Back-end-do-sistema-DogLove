const repository = require('../repositories/FavoritesRepository');

class FavoritesController{


    async get(request, response){
        const result = await repository.read();
        return response.status(200).json(result); 
    }

    async getOne(request, response){
        const {_idUser} = request.body
        const result = await repository.readOne(_idUser);
        if(result === null){
            const createResult = await repository.create(request.body)
            return response.status(201).json({ message: "Lista de favorito exibida" });
        }
        return response.status(200).json(result._idDogs); 
    }

    async put(request, response){
        const data = request.body;
        const result = await repository.update(data)
        if(result){

            return response.status(200).json({message: "Campos alterados com sucesso"})
        }else{
            return response.status(404).json({message: "Não foi possivel alterar os campos ou cachorro não encontrado"})
        }
    }

    async delete(request, response){
        const data = request.body;
    
        const result = await repository.delete(data);
    
        if(result){
            return response.status(201).json({message: "Dog excluido com sucesso"})
        }else{
            return response.status(400).json({message: "Não foi possivel excluir o dog"})
        }
    }

    async deleteAll(request, response){
        const {_id} = request.body;
    
        const result = await repository.deleteAll(_id);
    
        if(result){
            return response.status(201).json({message: "Lista inteira excluida"})
        }else{
            return response.status(400).json({message: "Erro ao excluir a lista"})
        }
    }
}
module.exports= new FavoritesController();