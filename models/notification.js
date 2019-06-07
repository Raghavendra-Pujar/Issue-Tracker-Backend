const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    issueId :{
        type : String,
        required : true
    },
    notificationType : {
        type : String,
        required : true,
        enum :['comment','edit']
    },
    userId : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    title :{
        type : String,
        required : true 
    },
    sentOn: { 
        type: Date, 
        default: Date.now 
    }
});

mongoose.model('Notification',notificationSchema);