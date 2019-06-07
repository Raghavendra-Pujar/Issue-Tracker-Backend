const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-html').loadType(mongoose);
var Html = mongoose.Types.Html;

 const IssueSchema = new Schema({
     issueId : {
         type : String,
         default : '',
         required : true,
         unique : true
     },
     title :{
        type : String,
        default :'',
        required : true
     },
     description : {
        type: Html,
        default :'',
        required : true
     },
     reporter :{
         type : Schema.Types.ObjectId,
         required: true, 
         ref: 'User'
     },
   
     assignee : {
        type : Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
     },
     status : {
        type : String,
        enum : ['backlog', 'in-progress', 'in-test', 'done'],
        required : true
     },
     createdOn : {
         type : Date,
         default : Date.now
     }
 })
 IssueSchema.index({'$**' : 'text'})
 mongoose.model('Issue',IssueSchema)