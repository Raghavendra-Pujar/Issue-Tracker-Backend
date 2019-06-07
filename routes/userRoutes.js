const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const appConfig = require('../config/appConfig')
const socialController = require('../controllers/socialLoginController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/users/login`, userController.loginFunction);
/** 
 * @apiGroup create
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/login api for user login
 * @apiParam {string} email email of the user. (body params) (required)
 * @apiParam {string} password password of the user. (body params) (required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response
 * {
 *  "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlJ4WmZhX29YViIsImlhdCI6MTU1ODExNjc1MjA2OSwiZXhwIjoxNTU4MjAzMTUyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpc3N1ZS10cmFja2VyLWFwcCIsImRhdGEiOnsidXNlcklkIjoiSnFFVXhiQ0otIiwidXNlck5hbWUiOiJSYWdoYXZlbmRyYSIsImVtYWlsIjoicmFnaHVAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo4OTc0NjI1MzEyLCJfaWQiOiI1Y2RhOWM2ZjQ4YmFmNjIwNzM3ODg4YzAiLCJnZW5kZXIiOiJtYWxlIn19.jg5cx8m8lyilp1AqBEoF7yc0pj5YngS8K3CvlhoHhZ0",
        "userDetails": {
            "userId": "JqEUxbCJ-",
            "userName": "Raghavendra",
            "email": "raghu@gmail.com",
            "mobileNumber": 8974625312,
            "_id": "5cda9c6f48baf620737888c0",
            "gender": "male"
                         }
            }
 * }
 *
 * 
 * @apiError {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiErrorExample {object} Error-Response :
 * {
 *   {
     "error": true,
     "message": "Email is missing",
     "status": 500,
     "data": null
      }
 * }
*/

app.post(`${baseUrl}/users/signup`,userController.signUp);

/** 
 * @apiGroup create
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/signup api for user Sign Up
 * 
 * @apiParam {string} userName Name of the user. (body params) (required)
 * @apiParam {string} email email of the user. (body params) (required)
 * @apiParam {string} passoword password of the user. (body params) (required)
 * @apiParam {boolean} gender Gender of the user. (body params) (required)
 * @apiParam {number} mobileNumber mobile number of the user. (body params) (required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response
 * {
 *  "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "userId": "11ikZ1xZR",
        "userName": "Nithin Kumar",
        "email": "Nithin@gmail.com",
        "mobileNumber": 8894623512,
        "_id": "5cdef9f4b458d745f3648c77",
        "gender": "male",
        "__v": 0
             }
 * }
 *
 * @apiError {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiErrorExample {object} Error-Response :
 * {
 *   {
    "error": true,
    "message": "User Already Present With this Email",
    "status": 403,
    "data": null
      }
 * }
*/
app.post(`${baseUrl}/users/verifyEmail`,userController.verifyEmail);

app.post(`${baseUrl}/users/googleLogin`,socialController.signInGoogle);

}