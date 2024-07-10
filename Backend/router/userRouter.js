import express from "express";
import { 
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getuserDetails,
    logOutAdmin,
    logOutPatient,
    login,
    patientRegister
} from "../Controller/userController.js";
import {
    isAdminAuthenticated,
    isPatientAuthenticated
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew", isAdminAuthenticated ,addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated , getuserDetails);
router.get("/patient/me", isPatientAuthenticated , getuserDetails);
router.get("/admin/logout", isAdminAuthenticated , logOutAdmin);
router.get("/patient/logout", isPatientAuthenticated , logOutPatient);
router.post("/doctor/addnew", isAdminAuthenticated , addNewDoctor);


export default router;