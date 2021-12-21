const jwt = require('jsonwebtoken');
const log = require('./LogService')
const SECRET = 'segredodoglove'

exports.generateToken = (data) => {

    return  jwt.sign({userId: data._id}, SECRET,{ expiresIn: '1d' });

}

exports.validateToken = (token) =>{
    try {
        const user = jwt.verify(token,SECRET)
        return user.userId;   
    } catch (error) {
        log('TokenService/validateToken','erro aqui', false)
        return null
    }
}

exports.decoteToken = (token) =>{
    return jwt.verify(token,SECRET)
}