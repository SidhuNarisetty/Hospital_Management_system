import express from "express";
import {config} from "dotenv";
import cors from "cors";
import coookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnections } from "./DataBase/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import {errorMiddleware} from "./middlewares/errorMiddleWare.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./Config/.env"});

app.use(
    cors({
        origin: [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
);

app.use(coookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment",appointmentRouter);

dbConnections();

app.use(errorMiddleware);

export default app;