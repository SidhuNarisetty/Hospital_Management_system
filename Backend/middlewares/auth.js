import { User } from "../Models/userSchema.js";
import ErrorHandler from "./errorMiddleWare.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.AdminToken;
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated!",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not autherised for this resources!`,403));
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.PatientToken;
    if(!token){
        return next(new ErrorHandler("Patient not Authenticated!",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} not autherised for this resources!`,403));
    }
    next();
});