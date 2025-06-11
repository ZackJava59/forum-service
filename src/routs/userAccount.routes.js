import express from "express";
import userValidator from "../middleware/userValidation.middleware.js"
import userAccountController from "../controllers/userAccount.controller.js";

const router = express.Router();

router.post('/register', userValidator('register'), userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:login', userAccountController.deleteUser);
router.patch('/user/:login', userValidator('updateUser'), userAccountController.updateUser);
router.patch('/user/:login/role/:role', userValidator('changeRoles', 'params'), userAccountController.addRole);
router.delete('/user/:login/role/:role', userValidator('changeRoles', 'params'), userAccountController.deleteRole);
router.patch('/password', userAccountController.changePassword);
router.get('/user/:login', userAccountController.getUser);

export default router;