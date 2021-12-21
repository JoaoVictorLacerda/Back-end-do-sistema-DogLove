const repository = require('../repositories/UserRepository');
const tokenService = require('../services/TokenService');

class UserController{

    async post(request, response){
        const result = await repository.create(request.body)

        if(result === true){


            return response.status(201).json({ message: "User adicionado com sucesso" });
        }else{

            return response.status(400).json({ message: "Algo deu errado"}); 
        }
    }

    async get(request, response){
        const result = await repository.read();
        return response.status(200).json(result); 
    }

    async updatePassword(request, response){
        const data = request.headers;

        const result = await repository.updatePassword(data)
    
        if(result){
 
            return response.status(200).json({message: "A senha foi alterada com sucesso"})
        }else{

            return response.status(400).json({message: "A senha não foi alterada com sucesso"})
        }
    }

    async updateUser(request, response){
        const data = request.body;
        
        const result = await repository.updateUser(data);
        if(result){

            return response.status(200).json({message: "O usuário foi alterada com sucesso"})
        }

        return response.status(400).json({message: "O usuário não foi alterado com sucesso"})
    }

    async delete(request, response){
        const {_id} = request.headers;

        if(!_id){

            return response.status(400).json({message: "Campos faltando"})
        }
        
        const result = await repository.delete(_id);
    
        if(result){

            return response.status(200).json({message: "usuário foi excluído com sucesso"})
        }else{

            return response.status(400).json({message: "usuário não foi excluído com sucesso"})
        }
    }

    async login(request, response){

        const data = request.body
        const result = await repository.login(data)
        if(result === undefined){

            return response.status(401).json({message: "Login incorreto"})
        }
        
        return response.status(302).json(result)
    }

    refreshToken(request, response){
        const data = request.body

        try {
            const oldToken = tokenService.decoteToken(data.token);
            if(oldToken.userId === data._id){

                return response.status(200).json({token: data.token})
            }

            return response.status(401).json({message: 'Não autorizado'})
            
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                const newToken = tokenService.generateToken(data);
                return response.status(200).json({token: newToken})
            }
            return response.status(400).json({message: 'Token inválido'})
        }

    }
    async getById(request, response){
        const { id } = request.query
        const user = await repository.getById(id) 

        if(!user){
            return response.status(400).json({message: 'Não encontrado'})
        }
        return response.status(302).json(user)

    }
    validateToken(request, response){
        const {token} =  request.headers
        const isValid = tokenService.validateToken(token);

        if(isValid === null){
            return response.status(401).json({message: 'Token inválido'})
        }
        return response.status(200).json({message: 'Token válido', idUser:isValid})

    }

}

module.exports= new UserController();