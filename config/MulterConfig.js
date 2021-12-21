const multer = require('multer');
const path = require('path');
const caminhoPasta = path.resolve(__dirname,'..','public/dogs/')
const update = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, caminhoPasta)
    },
    filename:  (req, file, cb) =>{
        const extensaoArquivo = file.mimetype.split('/')[1];

        const novoNomeArquivo = require('crypto')
            .randomBytes(16)
            .toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
})
module.exports = update;