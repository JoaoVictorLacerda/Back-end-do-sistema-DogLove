const express = require('express');
const router = express.Router();
const controller = require('../controllers/FavoritesController')
const authService = require('../services/AuthService')

class FavoritesRoute{
    constructor(){
       
        router.get('/', authService.authorize,controller.get);
        router.get('/get-one', authService.authorize,controller.getOne);
        router.patch('/',  authService.authorize,controller.put);
        router.delete('/', authService.authorize,controller.delete);
        router.delete('/delete-all', authService.authorize,controller.deleteAll);
    }
    getRouter(){
        return router;
    }
}

module.exports = new FavoritesRoute();
