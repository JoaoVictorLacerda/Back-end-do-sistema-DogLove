const tokenService = require('./TokenService');
const log = require('./LogService');

exports.authorize = async (request, response, next) =>{
    const token = request.headers['auth']

    const isValid = tokenService.validateToken(token);
    if(isValid){
        log('AuthService/authorize','Passou', true)
        next();
    }else{
        log('AuthService/authorize','Algo deu errado aqui', false)
        response.status(401).json({
            message: 'Token inválido'
        });
    }
       
    
}