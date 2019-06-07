const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watcherSchema = new Schema({
    issue :{
        type : Schema.Types.ObjectId,
        required: true, 
        ref: 'Issue'
    },
    watcher : {
        type : Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    addedOn : {
        type : Date,
        default : Date.now
    }
})

mongoose.model('Watcher',watcherSchema)