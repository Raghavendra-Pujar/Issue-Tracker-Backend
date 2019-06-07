const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('../libs/timeLib')
let commentSchema = new Schema(
    {

        commentId: {
            type: String,
            unique: true
        },
        issueId: {
            type: String,
            default: ''
        },
        commentor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        comment: {
            type: String,
            default: ''
        },
        created: {
            type: Date,
            default: time.now
        }
    });

mongoose.model('Comment', commentSchema);