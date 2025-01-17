import mongoose from "mongoose";

export const dbConnections = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_STACK_HOSPITAL_MANAGEMENT",
    }).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log(`Some error occured while connecting to database: ${err}`);
    });
}