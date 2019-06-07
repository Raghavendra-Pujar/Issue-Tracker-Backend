
const mongoose = require('mongoose')
const issueModel = mongoose.model('Issue');
const userModel = mongoose.model('User')
const shortid = require('shortid');
const notificationModel = mongoose.model('Notification');
const watcherController = require('../controllers/watcherController');

const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');

let raiseIssue = (req, res) => {

    let findAssignee = (req, res) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.assigneeEmail)) {
                let apiResponse = response.generate(true, 'Assignee Email is missing', 404, null);
                reject(apiResponse);
            } else if(req.body.assigneeEmail === req.user.email){
                let apiResponse = response.generate(true,'Cannot assign to self',500,null);
                reject(apiResponse);
            }
            else {
                userModel.findOne({ email: req.body.assigneeEmail }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'issueController.createIssue', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.info('no user found', 'issueController.createIssue', 10)
                        let apiResponse = response.generate(true, 'No User Found with this assignee email', 400, null);
                        reject(apiResponse);
                    } else {
                        req.assignee = result._id
                        resolve(req)
                    }
                })
            }
        })
    }

    let create = () => {
        return new Promise((resolve, reject) => {


            if (check.isEmpty(req.body.title)) {
                let apiResponse = response.generate(true, "Title of the Issue is needed", 404, null);
                logger.info('Title of the Issue is needed', 'issueController.createIssue', 10)
                reject(apiResponse);
            } else {
                let issue = new issueModel({
                    issueId: shortid.generate(),
                    title: req.body.title,
                    description: req.body.description,
                    reporter: req.user._id,
                    assignee: req.assignee,
                    status: req.body.status
                })

                issue.save((err, result) => {
                    console.log("Reached here")
                    if (err) {
                        logger.info(err.message, 'issueController.createIssue', 10);
                        let apiResponse
                        if (err.name = "ValidationError") {
                            apiResponse = response.generate(true, err.message, 403, null)
                        } else {
                            apiResponse = response.generate(true, "Internal server error", 500, null)
                        }
                        reject(apiResponse)
                    } else {
                        console.log(result)
                        watcherController.addReporterAndAssignee(result);
                        let apiResponse = response.generate(false, 'Issue raised successfully', 200, result);
                        resolve(apiResponse)
                    }
                })
            }
        })

    }
    findAssignee(req, res)
        .then(create)
        .then((resolve) => {
            res.send(resolve)
        }).catch((err) => {
            res.send(err)
        })

}

let listIssuesOfAssignee = (req, res) => {
    console.log(req.user._id)
    let pageNo = parseInt(req.body.pageNo);
    let size = parseInt(req.body.size);
    let query = {}
    if (pageNo < 0 || pageNo === 0) {
        apiresponse = response.generate(true, "invalid page number, should start with 1", 400, null);
        return res.send(response)
    }

    query.skip = size * (pageNo - 1)
    query.limit = size
    issueModel.find({ assignee: req.user._id }).populate('reporter').populate('assignee').skip(query.skip).limit(query.limit).exec((err, listOfIssues) => {
        if (err) {
            logger.info('err.message', 'issueController.listIssuesOfAssignee', 10)
            let apiResponse = response.generate(true, 'Database error', 400, null);
            res.send(apiResponse);
        } else if (check.isEmpty(listOfIssues)) {
            let apiResponse = response.generate(false, 'You are all caught up!!', 200, listOfIssues);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'Issues for you!', 200, listOfIssues);
            res.send(apiResponse);
        }
    })
}


let editIssue = (req, res) => {

    let findAssignee = (req, res) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.assigneeEmail)) {
                let apiResponse = response.generate(true, 'Assignee Email is missing', 404, null);
                reject(apiResponse);
            } 
            else {
                userModel.findOne({ email: req.body.assigneeEmail }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'issueController.createIssue', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.info('no user found', 'issueController.createIssue', 10)
                        let apiResponse = response.generate(true, 'No User Found with this assignee email', 400, null);
                        reject(apiResponse);
                    } else {
                        req.assignee = result._id;
                        resolve(req)
                    }
                })
            }
        })
    }

 


    let edit = () => {
        console.log('edit')
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.issueId)) {
                let apiResponse = response.generate(true, 'IssueId is missing', 403, null)
                reject(apiResponse)
            } else {
                console.log("Issue id found")
                issueModel.findOne({ issueId: req.params.issueId }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'issueController.editIssue', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        console.log('here')
                        let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                        reject(apiResponse)
                    } else {
                       watcherController.deleteWatcher(result.assignee);

                       if(req.assignee === result.reporter){
                        let apiResponse = response.generate(true, 'Reporter cannot be assigned', 404, null)
                        reject(apiResponse)
                       }
                       result.assignee = req.assignee;
                       result.title = req.body.title;
                       result.description = req.body.description;
                       result.status = req.body.status;
            
                       result.save((err,resp)=>{
                        if (err) {
                            logger.error(err.message, 'issueController.editIssue', 10)
                            let apiResponse = response.generate(true, 'Database error', 400, null);
                            reject(apiResponse);
                        }else{
                            watcherController.addReporterAndAssignee(result)
                            resolve(resp)
                        }
                       })
                    }
                })
            }
        })
    }

    findAssignee(req, res)
        .then(edit)
        .then((resolve) => {
            console.log('inside sucess promises')
            let apiResponse = response.generate(false, 'Issue Edited Successfully.', 200, resolve)
            res.send(apiResponse)
            let notification = new notificationModel({
                notificationType : 'edit',
                issueId : req.body.issueId,
                userId : req.user.userId,
                title : 'Issue has been edited',
                message : `${req.user.userName} has edited the issue`

            })
            console.log('sending to socket')
           
            eventEmitter.emit(notification.notificationType,notification);

        }).catch((err) => {
            res.send(err)
        })

}

let viewIssueById = (req, res) => {
    if (check.isEmpty(req.body.issueId)) {
        logger.info('Issue Id is missing', 'issueController.viewIssueById', 10);
        let apiResponse = response.generate(true, 'IssueId is missing', 404, null);
        res.send(apiResponse);
    } else {
        issueModel.findOne({ issueId: req.body.issueId }).populate('reporter','userName').populate('assignee','userName email').exec((err, issueDetails) => {
            if (err) {
                logger.info('err.message', 'issueController.editIssue', 10)
                let apiResponse = response.generate(true, 'Database error', 400, null);
                res.send(apiResponse);
            } else if (check.isEmpty(issueDetails)) {
                logger.info('No such Issue', 'issueController.viewIssueById', 5);
                let apiResponse = response.generate(true, 'No such issue found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue found with these details', 200, issueDetails);
                res.send(apiResponse);
            }
        })
    }
}

let searchText = (req, res) => {
    if (check.isEmpty(req.body.text)) {
        let apiResponse = response.generate(true, 'text needed to serach', 404, null);
        res.send(apiResponse)
    } else {
        issueModel.find({ $text: { $search: req.body.text } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } })
            .populate('reporter', 'userName').exec((err, result) => {
                if (err) {
                    logger.info('err.message', 'issueController.editIssue', 10)
                    let apiResponse = response.generate(true, 'Database error', 400, null);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(false, 'Search results', 200, result);
                    res.send(apiResponse);
                }
            })
    }

}

  
let verifyPermission = (req,res) =>{
    console.log(req.body.issueId)
    console.log(req.user._id)
    issueModel.findOne({ issueId: req.body.issueId }).exec((err, result) => {
        console.log(result.assignee);
        if (err) {
            logger.info(err.message, 'issueController.editIssue', 10)
            let apiResponse = response.generate(true, 'Database error', 400, null);
            res.send(apiResponse)
        }else if(req.user._id == result.assignee || req.user._id == result.reporter){
                let apiResponse = response.generate(false,'verified',200,result);
                res.send(apiResponse);
            }else{
                
                let apiResponse = response.generate(true,'Only Reporter or Assignee can edit the issue',500,null);
                res.send(apiResponse);
            }
        
    })

}

module.exports = {
    raiseIssue: raiseIssue,
    listIssuesOfAssignee: listIssuesOfAssignee,
    editIssue: editIssue,
    viewIssueById: viewIssueById,
    verifyPermission : verifyPermission,
    searchText: searchText
}