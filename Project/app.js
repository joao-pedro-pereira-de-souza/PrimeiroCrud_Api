
const express = require('express')
const mongoose = require('mongoose')

//#region settings and connection

require('./Models/Users')
require('./Models/Products')

mongoose.connect('mongodb://localhost/database' , {
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

app.get('/products' , (req, res) =>{

    Products.find({}).then((data) =>{

        return res.json(data)

    }).catch(()=>{

        return res.status(400).json({
            error:true,
            message:'ocoreu algum erro na busca'
        })

    })
    
})
app.get('/signIn' , async (req , res) =>{
    try{

        const {name , password} = req.body;
        
        const user = await Usuarios.findOne({name:name})

        if(!user){
            return res.status(400).json({
                error:true,
                message:'Nome de usuário não encontrado'
            })
        }

        if(password != user.password){

            return res.status(400).json({
                error:true,
                message:'Senha de usuário não encontrado'
            })

        }

        return res.json({
            error:false,
            message:'Login efetuado com sucesso'
        })
    }
    catch(err){
        console.log('Ocorreu algum erro no processo')
    }
})

app.listen(8080 , () =>{
    console.log('Servidor aberto com sucesso!!!')
})