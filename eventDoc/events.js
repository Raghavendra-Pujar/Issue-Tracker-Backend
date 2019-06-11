/**
     * @apiGroup Listen
     * @apiVersion 1.0.0
     * 
     *  
     * @api {event} verifyUser listening to verifyUser
     * 
     * @apiDescription This event ("verifyUser") has to be listened on the user's end to verify user authentication.
user will only be set as online user after verification of authentication token.

     * 
     * */

     /**
     * @apiGroup Listen
     * @apiVersion 1.0.0
     * 
     *  
     * @api {event} comment-notification listening for comments
     * 
     * @apiDescription This event ("comment-notification
     * ") has to be listened on the user's end to receive comment-notification from server.

     * 
     * */


     /**
     * @apiGroup Listen
     * @apiVersion 1.0.0
     * 
     *  
     * @api {event} edit-notification listening for edit
     * 
     * @apiDescription This event ("edit-notification
     * ") has to be listened on the user's end to receive edited-notification from server.

     * 
     * */

      /**
     * @apiGroup Emit
     * @apiVersion 1.0.0
     * 
     *  
     * @api {event} set-user setting the user details
     * 
     * @apiDescription This event should emitted by the client to register and set user detail to the socket connection. With out this the server will not identify the user as valid user.

     * 
     * */