const mongoose = require('mongoose');
const https = require('https');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');
const shortId = require('shortid')
// Models 
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');






let signInGoogle = (req,res)=>{


    const CLIENT_ID = "951167059862-cdtqjun6mr3rpfdit16okgf3ve2mgnjq.apps.googleusercontent.com";
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(CLIENT_ID);
    
    
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.authToken,
          audience: CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const gmail = payload['email'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
    
      UserModel.findOne({ email: gmail }, (err, userDetails) => {
        if (err) {
            logger.error('Failed To Retrieve User Data', 'socialUserController: signInGoogle()', 10)
        } else if (check.isEmpty(userDetails)) {
            create(payload, (userDetails) => {
                loginFunction(userDetails, (response) => {
                    res.send(response)
                })
            });
        } else {
            loginFunction(userDetails, (response) => {
                res.send(response)
            })
        }//end login
    });
    }
    verify().catch(console.error);
    }


    let create = (user,userCreated) =>{
        let newUser = new UserModel({
            userId: shortId.generate(),
            userName: user.name,
            email: user.email
        })
        newUser.save((err, newUser) => {
            if (err) {
                logger.error(err.message, 'userController: createUser', 10)
            } else {
                let newUserObj = newUser.toObject();
                userCreated(newUserObj)
            }
        })
    
    }

    let loginFunction = (createdUser, loggedIn) => {
        let findUser = (createdUser) => {
            console.log("findUser");
            return new Promise((resolve, reject) => {
            
    
                if (!check.isEmpty(createdUser.email)) {
                    console.log("req body email is there");
                    
                    UserModel.findOne({ email: createdUser.email }, (err, userDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                            let apiResponse = response.generate(true, 'Failed To Find User Details', 400, null)
                            reject(apiResponse)
                        } else if (check.isEmpty(userDetails)) {
                            logger.error('No User Found', 'userController: findUser()', 7)
                            let apiResponse = response.generate(true, 'No User Details Found!Please check your email', 404, null)
                            reject(apiResponse)
                        } else {
                            logger.info('User Found', 'userController: findUser()', 10)
                            resolve(userDetails)
                        }
                    });
    
                } else {
                    let apiResponse = response.generate(true, 'email is missing', 225, null)
                    reject(apiResponse)
                }
            })
        }
        
        let generateToken = (userDetails) => {
            console.log("generate token");
            return new Promise((resolve, reject) => {
                token.generateToken(userDetails, (err, tokenDetails) => {
                    if (err) {
                        console.log(err)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        tokenDetails.userId = userDetails.userId
                        tokenDetails.userDetails = userDetails
                        resolve(tokenDetails)
                    }
                })
            })
        }
        
    
    
        let saveToken = (tokenDetails) => {
            console.log("save token");
            return new Promise((resolve, reject) => {
                AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                    if (err) {
                        console.log(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedTokenDetails)) {
                        let newAuthToken = new AuthModel({
                            userId: tokenDetails.userId,
                            authToken: tokenDetails.token,
                            tokenSecret: tokenDetails.tokenSecret,
                            tokenGenerationTime: time.now()
                        })
                        newAuthToken.save((err, newTokenDetails) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    } else {
                        retrievedTokenDetails.authToken = tokenDetails.token
                        retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                        retrievedTokenDetails.tokenGenerationTime = time.now()
                        retrievedTokenDetails.save((err, newTokenDetails) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    }
                })
            })
        }
    
    
    
        findUser(createdUser)
            .then(generateToken)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
               
                loggedIn(apiResponse)
            })
            .catch((err) => {
                console.log("errorhandler");
                console.log(err);
                loggedIn(err)
            })
    }




module.exports = {
    signInGoogle : signInGoogle
}
    
    
    