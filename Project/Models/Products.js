const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const Products = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    value:{
        type:Decimal128,
        required:true
    },

    amount:{
        type:String,
        required:true
    },

},

{
    timestamps:true
}

)

mongoose.model('Products' , Products)