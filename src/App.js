const path = require('path');
class App{
    
    constructor(){
        require('dotenv').config()
        const express = require('express');
        const userRoute  = require('./routes/UserRoute');
        const matchRoute = require('./routes/MatchRoute');
        const dogRoute   = require('./routes/DogRoute');
        const favoritesRoute = require('./routes/FavoritesRoute')
        const cors = require('cors');

        this.app = express();
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static(path.resolve(__dirname,'..','public')))
        this.app.use('/user',userRoute.getRouter());
        this.app.use('/dog',dogRoute.getRouter());
        this.app.use('/match',matchRoute.getRouter());
        this.app.use('/favorites', favoritesRoute.getRouter());
    }
    getApp(){
        return this.app;
    }

}

module.exports= new App();