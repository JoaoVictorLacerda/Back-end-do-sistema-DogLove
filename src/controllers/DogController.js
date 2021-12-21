const repository = require('../repositories/DogRepository');


class DogController{

    deleteImg(request, response){
        const {name}= request.body;
        if(!name){
            return response.status(400).json({ message: "Informe o nome da img"}); 
        }
        const fs = require('fs');
        const path = require('path')
        const dir = path.resolve(__dirname,'..','..','public','dogs');
        fs.unlink(dir+`/${name}`,(err)=>{
            if (err) {
                return response.status(404).json({ message: "img não encontrada"}); 
            } else {
                return response.status(200).json({ message: "deletado"});                             
            }
        })
    }
    async post(request, response) {
        try{
            const fs = require('fs');
            const binary = fs.readFileSync(request.file.path);
            const fullUrl = request.protocol + '://' + request.get('Host');
            const novoNomeArquivo = request.file.filename;
            const linkImg = `${fullUrl}/dogs/${novoNomeArquivo}`
            
    
            const dog ={
                img:  binary,
                imgContentType: request.file.mimetype,
                linkImg:linkImg,
                data:request.body
            }
    
            
            const resultado = await repository.createDog(dog)
    
            if(resultado === true){
                return response.status(201).json({ message: "Dog cadastrado!" });
            }
            else{
                return response.status(400).json({ message: "Não foi possivel cadastrar seu doguinho"}); 
            }
        }catch(err){
            return response.status(400).json({ message: "Faltou campos"}); 

        }
    }

    async get(request, response){
        const {pag} = request.query;
        if(!pag || pag==0){
            return response.status(400).json({message: "informe uma página válida"})
        }

        const fullUrl = request.protocol + '://' + request.get('Host');
        
        const result = await repository.readDog(request.query,fullUrl);
        if(result.length !== 0){
            return response.status(302).json(result); 
        }
        return response.status(404).json(result); 
    }

    async put(request, response){
        const data = request.body;

        const result = await repository.updateDog(data)
        if(result){

            return response.status(200).json({message: "Campos alterados com sucesso"})
        }else{
            return response.status(404).json({message: "Não foi possivel alterar os campos ou cachorro não encontrado"})
        }
    }

    async delete(request, response){
        const {_id} = request.body;
    
        const result = await repository.deleteDog(_id);
    
        if(result){
            return response.status(200).json({message: "Dog excluido com sucesso"})
        }else{
            return response.status(400).json({message: "Não foi possivel excluir o dog"})
        }
    }

    async getDogByDono(request, response){
        const {id, pag} = request.query;
        if(!id||!pag || pag==0){
            return response.status(400).json({message: "informe um id e uma página válida"})
        }
        const fullUrl = request.protocol + '://' + request.get('Host');
        const result = await repository.getDogByDono(request.query, fullUrl);

        
        if(result.dogs.length!==0){

            return response.status(302).json(result)
        }

        return response.status(404).json({message:'Nada encontrado'})
        


    }
    async getAllDogsByDono(request, response){
        const {id} = request.query;
        if(!id){
            return response.status(400).json({message: "informe um id válido"})
        }
        const result = await repository.getAllDogsByDono(request.query);

        
        if(result.length!==0){

            return response.status(302).json(result)
        }

        return response.status(404).json({message:'Nada encontrado'})
    }

    async filterByState(request, response){
        const { state, pag } = request.query;

        if(!state || !pag){
            return response.status(400).json({message: "Informe um estado e uma página"})
        }
        const fullUrl = request.protocol + '://' + request.get('Host');

        const result = await repository.filterByState(request.query,fullUrl)
        if(result.length===0){

            return response.status(404).json({message: "Nenhum dog encontrado"})
        }
        return response.status(302).json(result)
    }

}
module.exports= new DogController();