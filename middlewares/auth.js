import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import USER_SCHEMA from '../models/userModel.js';

const authenticate = asyncHandler(async(req,res,next) => {
    let token = req.cookies?.myCookie;
    if(token){
        let decodeToken = jwt.verify(token,JWT_SECRET);
        let findUser = await USER_SCHEMA.findById(decodeToken.id);
        req.myUser = findUser;
        next();
    } else {
        throw new Error("No token present, Please provide token ");
    }
});

const authorize = asyncHandler(async(req,res,next) => {
    if(req.myUser.role === "admin"){
        next();
    } else {
        throw new Error("You are not authorised to perform this action");
    }
});

export { authenticate,authorize };