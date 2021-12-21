const request = require('supertest')
const app = require('../src/App')
const database = require('../config/ConnectionDatabase')
database()

let idUserTest;
let tokenUserTest;

let userTest={
    name:"TEST - usuário ",
    email: "TEST - email teste",
    password:"123456",
    state: "TEST - Paraíba - PB",
    city: "TEST - Serra Branca",
    district: "TEST - Alto da Conceição"
}

describe('Cadastro de users',()=>{
    it('Cadastra 1 usuário', async()=>{
        
        const res = await request(app.getApp()).post('/user').send(userTest);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User adicionado com sucesso');
            
    
    })
})

describe('Fazer login de user',()=>{
    it('Faz o login do usuário cadastrado acima',async ()=>{
        const res = await request(app.getApp()).post('/user/login').send({
            email: userTest.email,
            password: userTest.password
        })
        expect(res.status).toBe(302);
        idUserTest = res.body.id;
        tokenUserTest = res.body.token;
    })
})

describe('Refresh token',()=>{
    it('Faz o refrash do token do usuário cadastrado acima',async ()=>{
        const res = await request(app.getApp()).post('/user/refresh-token').send({
            _id:idUserTest,
            token: tokenUserTest
        })
        expect(res.status).toBe(200);
        tokenUserTest = res.body.token;
    })
})

describe('Deleta usuário',()=>{
    it('Deleta o usuário cadastrado acima',async ()=>{
        const res = await request(app.getApp())
        .delete('/user')
        .set('auth',tokenUserTest)
        .set('_id',idUserTest)
        .send();


        expect(res.status).toBe(200);
    })
})



