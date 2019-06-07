const mongoose = require('mongoose');
const commentModel = mongoose.model('Comment');
const issueModel = mongoose.model('Issue');
const notificationModel = mongoose.model('Notification');


const shortid = require('shortid');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');
const eventEmitter = require('../libs/eventLib').eventEmitter

let createComment = (req, res) => {

    let checkIssueExists = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.issueId)) {
                logger.info('Missing IssueId', 'commentController.createComment', 5);
                let apiResponse = response.generate(true, 'IssueId is missing', 404, null);
                reject(apiResponse)
            } else {
                issueModel.findOne({ issueId: req.body.issueId }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'issueController.createIssue', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(true, 'Issue not exists', 404, null);
                        reject(apiResponse);
                    }else{
                        resolve(req);
                    }
                })
            }
        })
    }

    let create = () => {
        return new Promise((resolve, reject) => {
            let commentObject = new commentModel({
                commentId: shortid.generate(),
                issueId: req.body.issueId,
                commentor: req.user._id,
                comment: req.body.comment
            })
            commentObject.save((err, result) => {
                if (err) {
                    logger.info(err.message, 'commentController.createIssue', 10)
                    let apiResponse = response.generate(true, 'Database error', 400, null);
                    reject(apiResponse);
                } else {
                    console.log('comment created')
                    let apiResponse = response.generate(false, 'Comment added successfully', 200, resolve);
            res.send(apiResponse);

            let notification = new notificationModel({
                notificationType : 'comment',
                issueId : req.body.issueId,
                userId : req.user.userId,
                title : 'Issue has a new comment',
                message : `${req.user.userName} has commented on the issue`

            })
            console.log('sending to socket')
            
            eventEmitter.emit(notification.notificationType,notification);

                    
                }
            })

        })
    }

    checkIssueExists(req, res)
        .then(create)
        .catch(apiResponse => { res.send(apiResponse) })

}

let viewCommentByIsssueId = (req,res) => {

    let checkIssueExists = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.issueId)) {
                logger.info('Missing IssueId', 'commentController.viewCommentsByIssueId', 5);
                let apiResponse = response.generate(true, 'IssueId is missing', 404, null);
                reject(apiResponse)
            } else {
                issueModel.find({ issueId: req.body.issueId }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'commentController.viewCommentsByIssueId', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(true, 'Issue not exists', 404, null);
                        reject(apiResponse);
                    }else{
                        resolve(req);
                    }
                })
            }
        })
    }


    let viewComments = () => {
        return new Promise((resolve, reject) => {
            commentModel.find({ issueId: req.body.issueId }).populate('commentor','userName').exec((err, result) => {
                if (err) {
                    logger.info(err.message, 'commentController.viewComments', 10)
                    let apiResponse = response.generate(true, err.message, 400, null);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                        logger.info('No comments found', 'commentController.viewCommentsByIssueId', 10)
                        let apiResponse = response.generate(true, 'There are no comments for this issue', 404, null);
                        reject(apiResponse);
                }else{
                    resolve(result);
                }
            })
        })
    }

checkIssueExists(req,res)
.then(viewComments)
.then((resolve)=>{
    let apiResponse = response.generate(false,'Comments found',200,resolve);
    res.send(apiResponse);
}).catch((err)=>{
    res.send(err);
})

}

module.exports = {
    createComment: createComment,
    viewCommentByIsssueId : viewCommentByIsssueId
}