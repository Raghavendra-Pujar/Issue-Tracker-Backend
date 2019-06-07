const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');


const eventEmitter = require('../libs/eventLib').eventEmitter



const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib');
const config = require('../config/appConfig');
const issueModel = mongoose.model('Issue');
const watcherModel = mongoose.model('Watcher');

const setServer = (server) =>{
    let io = socketio.listen(server);
    let myIo = io.of('');
    myIo.on('connection',(socket)=>{
        console.log('Someone is trying to connect')

        socket.emit('verifyUser','');
        socket.on('set-user',(authToken)=>{
            tokenLib.verifyWithoutSecret(authToken,(err,decoded)=>{
                if (err) {
                    socket.emit('authError', '')
                } else{
                    issueModel.find({}).exec((err,result)=>{
                        if(err){
                            socket.emit('connection-error','')
                        }else{
                            result.forEach(element => {
                                watcherModel.find({issue : element,watcher : decoded.data}).populate('issue').exec((err,watcherList)=>{
                                    if(err){
                                        socket.emit('connection-error','')
                                        console.log(err.message)

                                    }else if(check.isEmpty(watcherList)){
                                        console.log('WatcherList empty')
                                    }
                                    else{
                                        console.log(watcherList)
                                        watcherList.forEach(ele=>{
                                            socket.join(ele.issue.issueId);
                                        })
                                        
                                    }
                                })
                                
                            });
                        }
                    })
                    socket.userName = decoded.data.userName;
                    console.log(socket.userName + " connected to socket server")
                }
            })
        })
        try{
        eventEmitter.on('comment',(notification)=>{
            console.log('socket  reached')
            socket.broadcast.to(notification.issueId).emit('comment-notification',notification)
        })
    }catch(err){
        console.error('caught while receiving:', err.message);

    }
    
    try{
        eventEmitter.on('edit',(notification)=>{
            socket.broadcast.to(notification.issueId).emit('edit-notification',notification)

        })
    }  catch(err){
        console.log('caught while receiving:', err.message);

    }


    socket.on("disconnect", () => {
        console.log(`${socket.userId} disconnected`)
        socket.userId = null // this was added to tackle an issue of multiple connections! Apparently the socket io server does not suspend the removed connection and even after disconnection they keep receiving messages from the rooms.
    })
    
    })
   

}

module.exports = {
    setServer : setServer
}