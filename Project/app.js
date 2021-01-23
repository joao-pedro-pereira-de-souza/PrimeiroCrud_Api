
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/auth.json')
//#region settings and connection

require('./Models/Users')
require('./Models/Products')

mongoose.connect(config['base-mongo'] , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log('banco de dados Conectado')
}).catch(() =>{
    console.log('falha ao conectar no banco')
})

const Usuarios = mongoose.model('Users')
const Products = mongoose.model('Products')

//#endregion

const app = express();

app.use(express.json())

app.get('/' , (req, res) =>{

    Usuarios.find({}).then((data) =>{

        return res.json(data)

    }).catch(()=>{

        return res.status(400).json({
            error:true,
            message:'ocoreu algum erro na busca'
        })

    })
    
})

app.delete('/register/:id' , (req , res) =>{

    Usuarios.deleteOne({_id:req.params.id} , (err) => {

        if(err){

            return res.status(400).json({
                error:true,
                mesagem:'Erro no processo de detetar'
            })

        }

        return res.json({
            error:false,
            mesagem:'Usuário deletado'
        })

    })

})

app.post('/register', (req , res) =>{
    Usuarios.create(req.body, (err) =>{

        if(err){
            return res.status(400).json({

                error:true,
                mesagem:'Ocorreu algum erro no cadastro'

            })
        }

        return res.json({

            error:false,
            mesagem:'Usuário cadastrado'

        })

    })
})

app.put('/register/:id' , (req , res) => {

    Usuarios.updateOne({_id: req.params.id}, req.body ,(err)=>{

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

app.post('/myHeart/:id' , (req , res) =>{

    Usuarios.updateOne({_id:req.params.id} ,req.body, (err) =>{
        if(err){
            return res.status(400).json({
                error:true,
                message:'Ocorreu um erro no processo'
            })
        }

        return res.json({
            error:false,
            message:'Ocorreu um erro no processo'
        })
    })

    

})

app.post('/products' , (req , res) =>{

    Products.create(req.body , (err) =>{
        if(err){
            return res.status(400).json({
                error:true,
                message:'Erro no registro'
            })
        }
        return res.json({
            error:false,
            message:'Produto registrado com sucesso'
        })
    })
})

app.listen(8080 , () =>{
    console.log('Servidor aberto com sucesso!!!')
})