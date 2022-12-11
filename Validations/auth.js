const joi = require("joi");

const validateRegisterAPI = (params) => {
    const registerSchema =  joi.object({
        name: joi.string().trim().max(50).required(),
        password: joi.string().min(6).max(50).required(),
        email:joi.string().email().required()
    })

    let {error} = registerSchema.validate(params);
    if(error){
        const response = {
            message:"Please pass proper data",
            status: "error",
            code:400,
            error:error.details[0].message
        }
        return response
    }else{
        return ""
    }
}

const validateLoginAPI = (params) => {
    const loginSchema = joi.object({
        password: joi.string().min(6).max(50).required(),
        email:joi.string().email().required()
    })

    let {error} = loginSchema.validate(params);
    if(error){
        const response = {
            message:"Please pass proper data",
            status: "error",
            code:400,
            error:error.details[0].message
        }
        return response
    }else{
        return ""
    }
}



module.exports = {
    validateRegisterAPI,
    validateLoginAPI
}