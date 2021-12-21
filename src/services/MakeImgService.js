const fs = require('fs');
const path = require('path')
const dir = path.resolve(__dirname,'..','..','public','dogs');
const axios = require('axios');

exports.makeImg= async (data, fullUrl)=>{
    
    const dogs =[]
    const dogRepository = require('../repositories/DogRepository')
    for (let i = 0; i <  data.dogs.length; i++) {
        let element = data.dogs[i];
        let linkImg = element.linkImg;
        const isImgValid = await axios.get(element.linkImg)
        .then(()=>{
            return 200
        }).catch((err)=>{
            return 404
        })
        if(isImgValid === 404){
            const extensaoArquivo = element.imgContentType.split('/')[1];
            const novoNomeArquivo = require('crypto')
                .randomBytes(16)
                .toString('hex');
            
            let bitmap = Buffer.from(element.img,'base64')
            fs.writeFileSync(dir+`/${novoNomeArquivo}.${extensaoArquivo}`,bitmap,'binary',(err)=>{
                if(err){
                    console.log('Conversao com erro');  
                }
            });
            linkImg=fullUrl+`/dogs/${novoNomeArquivo}.${extensaoArquivo}`
            const updateLink = {
                _id:element._id,
                linkImg:linkImg
            }
            dogRepository.updateImg(updateLink);

        }
        const object ={
            _id: element._id,
            _idUser: element._idUser,
            nome: element.nome,
			sexo: element.sexo,
			idade: element.idade,
			raca: element.raca,
			descricao: element.descricao,
            city: element.city,
            state: element.state,
            linkImg: linkImg,
            emailDono: element.emailDono
        }
        dogs.push(object);
    }
    data['dogs'] = dogs;


    return data
}