function connectToDatabase(){
    const mongoose = require('mongoose')
    mongoose.connect(
        process.env.DATABASE_URL);

    const db = mongoose.connection;
    db.on("error", (error) => console.log("Erro ao conectar ao banco de dados: ", error.message));

    db.once("open", () => {

    });
}
module.exports = connectToDatabase;