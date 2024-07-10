import { User } from "../Models/userSchema.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import { generateToken } from "../Utils/jwtToken.js";
import cloudinary from "cloudinary";
import {config} from "dotenv";

cloudinary.config({
    cloud_name: "dwtwrsth9",
    api_key: 911739893251127,
    api_secret: "L5k96AeDYCxJDvItKKaRmjyrpkg",
})

export const patientRegister = catchAsyncErrors(async (req,res,next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        NIC,
        DoB,
        gender,
        password,
        role
    } = req.body;
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !NIC||
        !DoB||
        !gender||
        !password||
        !role
    ){
        return next(new ErrorHandler("Please Fill Full Form",400));
    }
    const user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Registered", 400));   
    }
    let user1 = await User.create({
        firstName,
        lastName,
        email,
        phone,
        NIC,
        DoB,
        gender,
        password,
        role
    });
    generateToken(user1, "User Registered!",200,res);
});

export const login = catchAsyncErrors(async (req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Details",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match",400));
    }
    const user = await User.findOne({email}).select("password role");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    const isPasswordPatient = await user.comparePassword(password);
    if(!isPasswordPatient){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User With role Not Found!",400));
    }
    generateToken(user, "User logged in Successfully!",200,res);
});

export const addNewAdmin = catchAsyncErrors(async (req,res,next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        NIC,
        DoB,
        gender,
        password
    } = req.body;
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !NIC||
        !DoB||
        !gender||
        !password
    ){
        return next(new ErrorHandler("Please Fill Full Form",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Admin with this Email Already Exists!",400));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        NIC,
        DoB,
        gender,
        password,
        role: "Admin",
    });
    generateToken(admin, "New Admin Registered!",200,res);
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getuserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const logOutAdmin = catchAsyncErrors((req,res,next) => {
    res.status(200).cookie("AdminToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    })
    res.status(200).json({
        success:true,
        message: "Admin Logged Out Successfully!",
    })
});

export const logOutPatient = catchAsyncErrors((req,res,next) => {
    res.status(200).cookie("PatientToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    })
    res.status(200).json({
        success:true,
        message: "Patient Logged Out Successfully!",
    })
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        NIC,
        DoB,
        gender,
        password,
        doctorDepartment
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !NIC ||
        !DoB ||
        !gender ||
        !password ||
        !doctorDepartment
    ) {
        return next(new ErrorHandler("Please Provide Full Details!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    try {
        console.log('Uploading file to Cloudinary:', docAvatar.tempFilePath);
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Cloudinary Error: " + (cloudinaryResponse.error.message || "Unknown Cloudinary error"), 500));
        }

        const doctor = await User.create({
            firstName,
            lastName,
            email,
            phone,
            NIC,
            DoB,
            gender,
            password,
            doctorDepartment,
            role: "Doctor",
            docAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        res.status(200).json({
            success: true,
            message: "New Doctor Registered!",
            doctor,
        });
    } catch (error) {
        console.error('Error during Cloudinary upload:', error);
        return next(new ErrorHandler("Error occurred while uploading to Cloudinary", 500));
    }
});