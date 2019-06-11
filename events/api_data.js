define({ "api": [
  {
    "group": "Emit",
    "version": "1.0.0",
    "type": "event",
    "url": "set-user",
    "title": "setting the user details",
    "description": "<p>This event should emitted by the client to register and set user detail to the socket connection. With out this the server will not identify the user as valid user.</p>",
    "filename": "eventDoc/events.js",
    "groupTitle": "Emit",
    "name": "EventSetUser"
  },
  {
    "group": "Listen",
    "version": "1.0.0",
    "type": "event",
    "url": "comment-notification",
    "title": "listening for comments",
    "description": "<p>This event (&quot;comment-notification &quot;) has to be listened on the user's end to receive comment-notification from server.</p>",
    "filename": "eventDoc/events.js",
    "groupTitle": "Listen",
    "name": "EventCommentNotification"
  },
  {
    "group": "Listen",
    "version": "1.0.0",
    "type": "event",
    "url": "edit-notification",
    "title": "listening for edit",
    "description": "<p>This event (&quot;edit-notification &quot;) has to be listened on the user's end to receive edited-notification from server.</p>",
    "filename": "eventDoc/events.js",
    "groupTitle": "Listen",
    "name": "EventEditNotification"
  },
  {
    "group": "Listen",
    "version": "1.0.0",
    "type": "event",
    "url": "verifyUser",
    "title": "listening to verifyUser",
    "description": "<p>This event (&quot;verifyUser&quot;) has to be listened on the user's end to verify user authentication. user will only be set as online user after verification of authentication token.</p>",
    "filename": "eventDoc/events.js",
    "groupTitle": "Listen",
    "name": "EventVerifyuser"
  }
] });
