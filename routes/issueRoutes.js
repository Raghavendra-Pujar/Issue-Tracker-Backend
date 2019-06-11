const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const issueController = require('../controllers/issueController');
const routeMiddleware = require('../middlewares/routeMiddleware');
const commentController = require('../controllers/commentController');
const watcherController = require('../controllers/watcherController');
const appConfig = require('../config/appConfig')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;

    app.post(`${baseUrl}/issue/raise`,routeMiddleware.isAuthorized,issueController.raiseIssue);

    /**
     * @apiGroup create
     * @apiVersion 1.0.0
     *
     * @api {post} /api/v1/issue/raise api for raising an issue
     * 
     * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
     * @apiparam {string} title title of the issue. {body params} {required}
     * @apiparam {string} description description of the issue. {body params} {required}
     * @apiparam {string} assignee asignee of the issue. {body params} {required}
     * @apiparam {string} backlog backlog of the issue. {body params} {required}
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response
     * {
     *    "error": false,
          "message": "Issue raised successfully",
          "status": 200,
          "data": {
             "issueId": "wYfNxQCDB",
             "title": "Issue in apidoc",
             "description": "this is just description to the first issue",
             "_id": "5cdefd04b458d745f3648c78",
             "reporter": "5cda9c6f48baf620737888c0",
             "assignee": "5cdd550958e3ad1a33728aed",
             "status": "backlog",
             "createdOn": "2019-05-17T18:27:16.254Z",
             "__v": 0
    }
     * }
     *
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     *  @apiErrorExample {object} Error-Response :
     * {
     *   
       "error": true,
       "message": "Invalid Or Expired AuthorizationKey",
       "status": 404,
       "data": null
         
     * }
     
     */

    app.post(`${baseUrl}/issue/getIssue-by-assignee`,routeMiddleware.isAuthorized,issueController.listIssuesOfAssignee);

     /**
     * @apiGroup read
     * @apiVersion 1.0.0
     *
     * @api {post} /api/v1/issue/getIssue-by-assignee api for getting Issue for assignee
     * 
     * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response
     * {
     *    
           "error": false,
           "message": "Issue found",
           "status": 200,
           "data": 
             {
            "issueId": "IiCAoB2XW",
            "title": "Edited First ever issue",
            "description": "edited description",
            "_id": "5cdd586c6f3a011c8ee2b75c",
            "reporter": "5cda9c6f48baf620737888c0",
            "assignee": "5cdd550958e3ad1a33728aed",
            "status": "backlog",
            "createdOn": "2019-05-16T12:32:44.896Z",
            "__v": 0
             }
     * }
     *
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     *  @apiErrorExample {object} Error-Response :
     * {
     *   
       "error": true,
       "message": "Invalid Or Expired AuthorizationKey",
       "status": 404,
       "data": null
         
     * }
     
     */
    
    app.post(`${baseUrl}/issue/verifyEditer`,routeMiddleware.isAuthorized,issueController.verifyPermission)
    app.put(`${baseUrl}/issue/:issueId/editIssue`, routeMiddleware.isAuthorized, issueController.editIssue);

    /** 
    * @apiGroup update
    * @apiVersion 1.0.0
    * 
    * @api {put} /api/v1/issue/:issueId/editIssue api for editing an issue
    * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
    * 
    * @apiParam {string} issueId IssueId of the Issue to be edited
    * @apiParam {string} title Edited Title
    * @apiParam {string} description Edited Description of the Issue
    * @apiParam {string} assigneeEmail Edited email of the assignee
    * @apiParam {string} status Edited status of the Issue
    * 
    * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response
   {
    "error": false,
    "message": "Issue Edited Successfully.",
    "status": 200,
    "data": {
        "issueId": "ai4ZN2aZr",
        "title": "Watcher errors",
        "description": "<p>Watcher array is not added with reporters and assignee</p>\\n",
        "_id": "5cf6667b9daef31c014ee964",
        "reporter": "5ce446badd08810ec4efcf16",
        "assignee": "5ced7fa925348e3b7da8d0a7",
        "status": "in-test",
        "createdOn": "2019-06-04T12:39:23.054Z",
        "__v": 0
    }
}
    * 
    * @apiError {object} apiResponse shows error status, message, http status code, result.
    * @apiErrorExample {object} Error-Response :
    * {
    *   
      "error": true,
      "message": "Invalid Or Expired AuthorizationKey",
      "status": 404,
      "data": null
        
    * }
    */


   /** 
    * @apiGroup read
    * @apiVersion 1.0.0
    * 
    * @api {post} /api/v1/issue/viewIssueById api for viewing an issue
    * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
    * @apiParam {string} issueId IssueId of the Issue to be viewed
    * 
    * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response
    * {
    *      
            "error": false,
            "message": "Issue found with these details",
            "status": 200,
            "data": {
              "issueId": "ai4ZN2aZr",
              "title": "Watcher errors",
              "description": "<p>Watcher array is not added with reporters and assignee</p>\n",
               "_id": "5cf6667b9daef31c014ee964",
              "reporter": {
                 "userName": "Sree Latha",
                  "_id": "5ce446badd08810ec4efcf16"
               },
              "assignee": {
                  "userName": "Nithin Kumar",
                  "email": "nithin@gmail.com",
                  "_id": "5ced7fa925348e3b7da8d0a7"
                },
            "status": "in-test",
            "createdOn": "2019-06-04T12:39:23.054Z",
            "__v": 0
        }
            
    * }
    *
    * 
    * @apiError {object} apiResponse shows error status, message, http status code, result.
    * @apiErrorExample {object} Error-Response :
    * {
    *   
      "error": true,
      "message": "No such issue found",
      "status": 404,
      "data": null
}
    * }
    
    */
    app.post(`${baseUrl}/issue/viewIssueById`,routeMiddleware.isAuthorized,issueController.viewIssueById)



 /** 
    * @apiGroup search
    * @apiVersion 1.0.0
    * 
    * @api {post} /api/v1/issue/search api for searching an issue with any keyword
    * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
    * @apiParam {string} text text or string to be serached in the database
    * 
    * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response
    *{
      
    "error": false,
    "message": "Search results",
    "status": 200,
    "data": [
        {
            "issueId": "ktDYdqx8B",
            "title": "validations from postman edited",
            "description": "<p>you have to test it for assignee Email</p>\n",
            "_id": "5cf6a4355cf4b83387f7b6b2",
            "reporter": {
                "userName": "Raghavendra Pujar",
                "_id": "5ce44364dd08810ec4efcf14"
            },
            "assignee": "5ced7fa925348e3b7da8d0a7",
            "status": "done",
            "createdOn": "2019-06-04T17:02:45.992Z",
            "__v": 0,
            "score": 0.6666666666666666
        }
    ]

     }
    *
    * 
    * @apiError {object} apiResponse shows error status, message, http status code, result.
    * @apiErrorExample {object} Error-Response :
    * {
    *   
    "error": true,
    "message": "No such word exists in the database",
    "status": 404,
    "data": null
}
    * }
    
    */

    app.post(`${baseUrl}/issue/search`,routeMiddleware.isAuthorized,issueController.searchText);

/**
     * @apiGroup create
     * @apiVersion 1.0.0
     *
     * @api {post} /api/v1/comment/create api for writing a comment
     * 
     * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
     * @apiparam {string} issueId issueId of the issue where comment is to be posted {body params} {required}
     * @apiparam {string} comment text or string  of the comment to be posted. {body params} {required}
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response
    {
    "error": false,
    "message": "Comment added successfully",
    "status": 200,
    "data": {
        "issueId": "ai4ZN2aZr",
        "comment": "Commented posted for documentation",
        "_id": "5cff75bab25d3a18edef2baa",
        "commentId": "VMh5T6jYs",
        "commentor": "5ced7fa925348e3b7da8d0a7",
        "created": "2019-06-11T09:34:50.000Z",
        "__v": 0
    }
}
     *
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     *  @apiErrorExample {object} Error-Response :
     * 
     * {
    "error": true,
    "message": "Issue not exists",
    "status": 404,
    "data": null
}
     
     */


    app.post(`${baseUrl}/comment/create`,routeMiddleware.isAuthorized,commentController.createComment);

/**
     * @apiGroup read
     * @apiVersion 1.0.0
     *
     * @api {post} /api/v1/comment/viewCommentsById api for viewing comments of an Issue
     * 
     * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
     * @apiparam {string} issueId issueId of the issue where comment is to be posted {body params} {required}     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response
    {
    "error": false,
    "message": "Comments found",
    "status": 200,
    "data": [
        {
            "issueId": "eZ9AJk3E6",
            "comment": "testing for documentation",
            "_id": "5cff797ad9a5901f9c572e97",
            "commentId": "gb4zNT_Ui",
            "commentor": {
                "userName": "Nithin Kumar",
                "_id": "5ced7fa925348e3b7da8d0a7"
            },
            "created": "2019-06-11T09:50:50.000Z",
            "__v": 0
        },
        {
            "issueId": "eZ9AJk3E6",
            "comment": "ok now",
            "_id": "5cff7bf326cea0212675d102",
            "commentId": "Xd8W6fltx",
            "commentor": {
                "userName": "Nithin Kumar",
                "_id": "5ced7fa925348e3b7da8d0a7"
            },
            "created": "2019-06-11T10:01:23.000Z",
            "__v": 0
        }
 
     *
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     *  @apiErrorExample {object} Error-Response :
     * 
     * {
    "error": true,
    "message": "Issue not exists",
    "status": 404,
    "data": null
}
     
     */


    app.post(`${baseUrl}/comment/viewCommentsById`,routeMiddleware.isAuthorized,commentController.viewCommentByIsssueId);
    

/**
     * @apiGroup create
     * @apiVersion 1.0.0
     *
     * @api {post} /api/v1/watcher/add api for adding watcher to an Issue
     * 
     * @apiParam {string} authToken authToken of the user received while  logging in . (body params) (required)
     * @apiparam {string} issueId issueId of the issue where comment is to be posted {body params} {required}     * 
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response
      {
    "error": false,
    "message": "Watcher added successfully",
    "status": 200,
    "data": {
        "_id": "5cff87a671d9512af087b8b7",
        "issue": "5cff879d71d9512af087b8b4",
        "watcher": "5ce446badd08810ec4efcf16",
        "addedOn": "2019-06-11T10:51:18.219Z",
        "__v": 0
    }
}

     *
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     *  @apiErrorExample {object} Error-Response :
     * 
  {
    "error": true,
    "message": "You are already watching this issue",
    "status": 400,
    "data": {
        "_id": "5cff879d71d9512af087b8b6",
        "issue": "5cff879d71d9512af087b8b4",
        "watcher": "5ce44364dd08810ec4efcf14",
        "addedOn": "2019-06-11T10:51:09.239Z",
        "__v": 0
    }
}
     
     */


    app.post(`${baseUrl}/watcher/add`,routeMiddleware.isAuthorized,watcherController.addWatcher)
}