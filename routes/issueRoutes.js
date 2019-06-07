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
     *   {
       "error": true,
       "message": "Invalid Or Expired AuthorizationKey",
       "status": 404,
       "data": null
         }
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
     *    {
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
     *   {
       "error": true,
       "message": "Invalid Or Expired AuthorizationKey",
       "status": 404,
       "data": null
         }
     * }
     
     */
    app.post(`${baseUrl}/issue/verifyEditer`,routeMiddleware.isAuthorized,issueController.verifyPermission)

    app.put(`${baseUrl}/issue/:issueId/editIssue`, routeMiddleware.isAuthorized, issueController.editIssue);

    app.post(`${baseUrl}/issue/viewIssueById`,routeMiddleware.isAuthorized,issueController.viewIssueById)

    app.post(`${baseUrl}/issue/search`,routeMiddleware.isAuthorized,issueController.searchText);

    app.post(`${baseUrl}/comment/create`,routeMiddleware.isAuthorized,commentController.createComment);

    app.post(`${baseUrl}/comment/viewCommentsById`,routeMiddleware.isAuthorized,commentController.viewCommentByIsssueId);
    
    app.post(`${baseUrl}/watcher/add`,routeMiddleware.isAuthorized,watcherController.addWatcher)
}