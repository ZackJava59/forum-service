import express from "express";
import userValidator from "../middleware/userValidation.middleware.js"
import userAccountController from "../controllers/userAccount.controller.js";

const router = express.Router();

router.post('/register', userValidator('addUser'), userAccountController.registerUser);
router.delete('/user/:login', userAccountController.deleteUser);
router.patch('/user/:login', userValidator('updateUser'), userAccountController.updateUser);


export default router;