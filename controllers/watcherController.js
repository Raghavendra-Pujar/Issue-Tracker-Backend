
const shortid = require('shortid');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');
const mongoose = require('mongoose')
const issueModel = mongoose.model('Issue');
const watcherModel = mongoose.model('Watcher');
const userModel = mongoose.model('User');

let addWatcher = (req, res) => {
    let checkWatcherExists = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.issueId)) {
                logger.info('No issueId found', 'watcherController.addWatcher', 10);
                let apiResponse = response.generate(true, 'IssueId is missing', 404, null);
                reject(apiResponse);
            } else {
                issueModel.findOne({ issueId: req.body.issueId }).exec((err, result) => {
                    if (err) {
                        logger.info(err.message, 'watcherController.createIssue', 10)
                        let apiResponse = response.generate(true, 'Database error', 400, null);
                        reject(apiResponse);
                    } else if(check.isEmpty(result)){
                        logger.info('No Issue found','watcherController.addwatcher',10);
                        let apiResponse = response.generate(true,'No issue found',400,null);
                        reject(apiResponse);
                    }else{
                        req.issue = result;
                        resolve(req)
                    }
                })
            }
        })
    }

    let checkAlreadyWatcher = () =>{
        return new Promise ((resolve,reject)=>{
            watcherModel.findOne({watcher : req.user,issue : req.issue}).exec((err,result)=>{
                if(err){
                    logger.info(err.message, 'watcherController.createIssue', 10)
                    let apiResponse = response.generate(true, 'Database error', 400, null);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    resolve()
                }else{
                    let apiResponse = response.generate(true,'You are already watching this issue',400,result);
                    reject(apiResponse);
                }
            })
        })
    }

    let add = () => {
        return new Promise((resolve,reject)=>{
            let Watcher = new watcherModel({
                issue : req.issue._id,
                watcher : req.user._id
            })

            Watcher.save((err,result)=>{
                if(err){
                    logger.info(err.message, 'watcherController.createIssue', 10)
                    let apiResponse = response.generate(true, 'Database error', 400, null);
                    reject(apiResponse);  
                }else{
                    resolve(result)
                }
            })
        })
    }

    checkWatcherExists(req,res)
    .then(checkAlreadyWatcher)
    .then(add)
    .then((resolve)=>{
        let apiResponse = response.generate(false,'Watcher added successfully',200,resolve);
        res.send(apiResponse);
    }).catch((err)=>{
        res.send(err)
    })
}
let addReporterAndAssignee = (issue,edited = false) =>{

    if(edited){
        //watcherModel.deleteOne({watcher :})
    }else{
    let watcher1 = new watcherModel({
        issue : issue._id,
        watcher : issue.reporter
    })

    let watcher2 = new watcherModel({
        issue : issue._id,
        watcher : issue.assignee
    })

    let watcherArray = [watcher1,watcher2];
    
    for(watcher of watcherArray){
        watcher.save((err,result)=>{
            if(err){
                logger.error(err.message, 'watcherController.addReporterAndAssignee', 10)
            }else{
                logger.info('watcher added','watcherController.addReporterAndAssignee',20)
            }
        })
    }
    }
}

let deleteWatcher = (watcher) =>{
watcherModel.findOneAndRemove({watcher : watcher}).exec((err)=>{
    if(err){
        logger.error(err.message, 'watcherController.addReporterAndAssignee', 10)

    }else{
        logger.info('Deleted Watcher','watcherController.deleteWatcher',10);
    }
})
}

module.exports = {
    addWatcher : addWatcher,
    addReporterAndAssignee : addReporterAndAssignee,
    deleteWatcher : deleteWatcher
}