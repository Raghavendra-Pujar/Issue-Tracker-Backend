const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({

    userId :{
        type : String,
        default : '',
    },
    userName :{
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : '',
        unique : true
    },
    password : {
        type : String,
        default : ''
    }

})

mongoose.model('User',User);