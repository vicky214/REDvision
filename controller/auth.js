const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LoginAttemptService = require("../services/loginAttempt");
const {JWT_SECRET} = require('../config/index');
const ObjectId =  require('mongoose').Types.ObjectId;
const {validateRegisterAPI, validateLoginAPI} =  require("../Validations/auth");

module.exports.Register = async (req, res) => {
    try{
        let ErrorOccuredDuringValidation = await validateRegisterAPI(req.body)
        if(ErrorOccuredDuringValidation){
            return res.json(ErrorOccuredDuringValidation)
        }

        let {email, name, password} = req.body;
        email = email.toLowerCase();
        const userData = {
            email,
            name
        }
        UserModel.findOne({email:email})
        .then(async (user)=>{
            if(!user){
                let hashPassword = await bcrypt.hashSync(password);
                userData.password = hashPassword
                UserModel.create(userData)
                        .then(async newUser=>{
                            const token=jwt.sign(
                                {_id:newUser._id},
                                JWT_SECRET,
                                { expiresIn: '1h' }
                            );
                            let userResData = {
                                name: newUser.name,
                                email: newUser.email
                            }
                            await LoginAttemptService.saveAttempt({status:"Success", reason: "", userId: newUser._id})
                            return res.json({
                                message: 'User Registered Succesfully',
                                status: "success",
                                code: 200,
                                token,
                                userResData
                            })
                        })
                        .catch(err=>{
                            return res.json({
                                message: "Something went wrong",
                                status:"error",
                                code: 400,
                                error:err
                            })
                        })
            }
            else{
                return res.json({
                    message:"User already exist",
                    status:"error",
                    code: 400
                })
            }
        })
        .catch(err=>{
            return res.json({
                message: "Something went wrong",
                status:"error",
                code: 400,
                error:err
            })
        })
    }catch(error){
        return res.json({
            message: "Internal server error",
            status:"error",
            code: 500,
            error: error.toString()
        })
    }
}

module.exports.Login = async (req, res) => {
    try{
        let ErrorOccuredDuringValidation = await validateLoginAPI(req.body)
        if(ErrorOccuredDuringValidation){
            return res.json(ErrorOccuredDuringValidation)
        }

        let {email, password} = req.body;
        email = email.toLowerCase();
        let userData = await UserModel.findOne({email:email})
        if(userData){
            let hashPassword = bcrypt.compareSync(password, userData.password);
            if(hashPassword){
                const token=jwt.sign(
                    {_id:userData._id},
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );
                let userResData = {
                    name: userData.name,
                    email: userData.email
                }
                await LoginAttemptService.saveAttempt({status:"Success", reason: "", userId: userData._id})
                return res.json({
                    message:"User login successfully",
                    status:"success",
                    code:200,
                    token,
                    userResData
                })
            }else{
                await LoginAttemptService.saveAttempt({status:"Error", reason: "Invalid credentials", userId:userData._id})
                return res.json({
                    message:"Invalid credentials",
                    status:"error",
                    code:400
                })
            }

        }else{
            return res.json({
                message:"No user found",
                status:"error",
                code:400
            })
        }
      
    }catch(error){
        return res.json({
            message: "Internal server error",
            status:"error",
            code: 500,
            error:error.toString()
        })
    }
}

module.exports.Dashboard = async (req, res) => {
    try{
        const {userId} = req.body;
        let match = { _id: ObjectId(userId)};
        let data = await UserModel.aggregate([
            {
                $match : match
            },
            {
                $lookup:
                  {
                    from: "loginattempts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "attemptData"
                  }
            },
            {
                $project: {
                    name : 1,
                    email : 1,
                    attemptData : 1
                }
            }
        ]);
        if(data && data.length > 0){
            return res.json({
                message: "Data found succssfully",
                status:"success",
                code: 200,
                data: data
            })
        }else{
            return res.json({
                message: "No data found",
                status:"error",
                code: 400
            })
        }
    }catch(error){
        return res.json({
            message: "Internal server error",
            status:"error",
            code: 500,
            error:error
        })
    }
}