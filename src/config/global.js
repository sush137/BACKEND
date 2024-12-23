const RESPONSE =  {
    SUCESS : {
        code : 200,
        message : "Everything worked as expected" ,
    },
    UNKNOWN_ERR : {
        code : 500,
        message : "something went wrong!!",
    },

    REQUIRED : {
        code : 201,
        message : "is mandatory",
    },

ALREADY_EXISTS : {
    code : 202,
    message : "already exists",
},

INVALID: {
    code : 203,
    message : "is invalid",
},
NOTFOUND: {
    code : 204,
    message : "not found",
},
};

export default RESPONSE;