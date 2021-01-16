const mongoose = require('mongoose')

const Users = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{

        type: String,
        required:true

    },
    password:{

        type:String,
        required:true

    },
    heartProductions:{
        type:Array,
        required:false
    },

},

{
    timestamps:true
}

)

mongoose.model('Users' , Users)