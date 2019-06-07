define({ "api": [
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/raise",
    "title": "api for raising an issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user received while  logging in . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the issue. {body params} {required}</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the issue. {body params} {required}</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>asignee of the issue. {body params} {required}</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "backlog",
            "description": "<p>backlog of the issue. {body params} {required}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n   \"error\": false,\n          \"message\": \"Issue raised successfully\",\n          \"status\": 200,\n          \"data\": {\n             \"issueId\": \"wYfNxQCDB\",\n             \"title\": \"Issue in apidoc\",\n             \"description\": \"this is just description to the first issue\",\n             \"_id\": \"5cdefd04b458d745f3648c78\",\n             \"reporter\": \"5cda9c6f48baf620737888c0\",\n             \"assignee\": \"5cdd550958e3ad1a33728aed\",\n             \"status\": \"backlog\",\n             \"createdOn\": \"2019-05-17T18:27:16.254Z\",\n             \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response :",
          "content": "{\n  {\n       \"error\": true,\n       \"message\": \"Invalid Or Expired AuthorizationKey\",\n       \"status\": 404,\n       \"data\": null\n         }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoutes.js",
    "groupTitle": "create",
    "name": "PostApiV1IssueRaise"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlJ4WmZhX29YViIsImlhdCI6MTU1ODExNjc1MjA2OSwiZXhwIjoxNTU4MjAzMTUyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpc3N1ZS10cmFja2VyLWFwcCIsImRhdGEiOnsidXNlcklkIjoiSnFFVXhiQ0otIiwidXNlck5hbWUiOiJSYWdoYXZlbmRyYSIsImVtYWlsIjoicmFnaHVAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo4OTc0NjI1MzEyLCJfaWQiOiI1Y2RhOWM2ZjQ4YmFmNjIwNzM3ODg4YzAiLCJnZW5kZXIiOiJtYWxlIn19.jg5cx8m8lyilp1AqBEoF7yc0pj5YngS8K3CvlhoHhZ0\",\n        \"userDetails\": {\n            \"userId\": \"JqEUxbCJ-\",\n            \"userName\": \"Raghavendra\",\n            \"email\": \"raghu@gmail.com\",\n            \"mobileNumber\": 8974625312,\n            \"_id\": \"5cda9c6f48baf620737888c0\",\n            \"gender\": \"male\"\n                         }\n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response :",
          "content": "{\n  {\n     \"error\": true,\n     \"message\": \"Email is missing\",\n     \"status\": 500,\n     \"data\": null\n      }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user Sign Up",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "passoword",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"11ikZ1xZR\",\n        \"userName\": \"Nithin Kumar\",\n        \"email\": \"Nithin@gmail.com\",\n        \"mobileNumber\": 8894623512,\n        \"_id\": \"5cdef9f4b458d745f3648c77\",\n        \"gender\": \"male\",\n        \"__v\": 0\n             }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response :",
          "content": "{\n  {\n    \"error\": true,\n    \"message\": \"User Already Present With this Email\",\n    \"status\": 403,\n    \"data\": null\n      }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/getIssue-by-assignee",
    "title": "api for getting Issue for assignee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user received while  logging in . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n   {\n           \"error\": false,\n           \"message\": \"Issue found\",\n           \"status\": 200,\n           \"data\": \n             {\n            \"issueId\": \"IiCAoB2XW\",\n            \"title\": \"Edited First ever issue\",\n            \"description\": \"edited description\",\n            \"_id\": \"5cdd586c6f3a011c8ee2b75c\",\n            \"reporter\": \"5cda9c6f48baf620737888c0\",\n            \"assignee\": \"5cdd550958e3ad1a33728aed\",\n            \"status\": \"backlog\",\n            \"createdOn\": \"2019-05-16T12:32:44.896Z\",\n            \"__v\": 0\n           }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response :",
          "content": "{\n  {\n       \"error\": true,\n       \"message\": \"Invalid Or Expired AuthorizationKey\",\n       \"status\": 404,\n       \"data\": null\n         }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoutes.js",
    "groupTitle": "read",
    "name": "PostApiV1IssueGetissueByAssignee"
  }
] });
