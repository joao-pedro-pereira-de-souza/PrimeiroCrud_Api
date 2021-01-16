const express = require('express')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/database' , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log('banco de dados Conectado')
}).catch(() =>{
    console.log('falha ao conectar no banco')
})

const app = express();

app.get('/' , (req , res ) =>{

    return res.json({mensagem:'primeiro teste'})


})

app.listen(8080 , () =>{
    console.log('Servidor aberto com sucesso!!!')
})