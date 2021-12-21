const express = require('express');
const router = express.Router();
const controller = require('../controllers/MatchController')
const authService = require('../services/AuthService')
const matchService = require('../services/MatchService')

class DogRoute{
    constructor(){
        router.post('/enviar-email', authService.authorize, controller.enviarEmail)
        router.delete('/',authService.authorize,controller.deleteById)
        router.post('/',authService.authorize,matchService.authorizeMatch,controller.post)
        router.get('/get-by-id',authService.authorize, controller.getById);
        router.get('/',authService.authorize, controller.get);
        

    }
    getRouter(){
        return router;
    }
}

module.exports = new DogRoute();