import express from "express";
import {getmecontroller, registercontroller, updatecontroller, logincontroller, logoutcontroller} from "../controller/auth.controller.js";
import {authmiddleware} from "../middleware/auth.middleware.js";
import  upload from "../lib/multer.js";
const router = express.Router();

/*
    * @route POST /api/auth/register
    * @desc Register a new user
    * @access Public
*/
router.post("/register", registercontroller);
/*
    * @route POST /api/auth/login
    * @desc Login a user
    * @access Public
*/
router.post("/login", logincontroller);
/*
    * @route POST /api/auth/logout
    * @desc Logout a user
    * @access Public
*/
router.post("/logout", logoutcontroller);

/*
    * @route GET /api/auth/me
    * @desc Get current user
    * @access Private
*/
router.get("/me", authmiddleware, getmecontroller);

/*
    * @route PUT /api/auth/update
    * @desc Update user details
    * @access Private
*/
router.put("/update", authmiddleware,upload.single("profilePicture"), updatecontroller);
export default router;