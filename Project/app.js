
const express = require('express')
const mongoose = require('mongoose')

//#region settings and connection

require('./Models/Users')

mongoose.connect('mongodb://localhost/database' , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log('banco de dados Conectado')
}).catch(() =>{
    console.log('falha ao conectar no banco')
})

const Usuarios = mongoose.model('Users')

//#endregion

const app = express();

app.use(express.json())

app.get('/' , (req, res) =>{

    Usuarios.find({}).then((data) =>{

        return res.json(data)

    }).catch(()=>{

        return res.status(400).json({
            error:true,
            mesagem:'ocoreu algum erro na busca'
        })

    })
    
})

app.put('/register/:id' , (req , res) => {

    Usuarios.updateOne({_id: req.params.id}, req.body , (err)=>{

        if(err){

            return res.status(400).json({

                error:true,
                message:'Ocorreu um erro na atualzação'

            })

        }

        return res.json({

            error:false,
            message:'Usuário atualizado'

        })

    })

})

app.listen(8080 , () =>{
    console.log('Servidor aberto com sucesso!!!')
})