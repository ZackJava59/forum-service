import express from "express";
import userValidator from "../middleware/userValidation.middleware.js"
import userAccountController from "../controllers/userAccount.controller.js";
import authenticate from "../middleware/authentication.middleware.js"
import {authorize} from "../middleware/authorize.js";
import {isOwner, isOwnerOrAdmin} from "../middleware/accessConditions.js";

const router = express.Router();

router.post('/register', userValidator('register'), userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:login',
    authenticate,
    authorize({roles: ['User', 'Admin'], condition: isOwnerOrAdmin}),
    userAccountController.deleteUser);
router.patch('/user/:login',
    authenticate,
    authorize({roles: ['User'], condition: isOwner}),
    userValidator('updateUser'),
    userAccountController.updateUser);

router.patch('/user/:login/role/:role',
    authenticate,
    authorize({roles: ['Admin']}),
    userValidator('changeRoles', 'params'),
    userAccountController.addRole);

router.delete('/user/:login/role/:role',
    authenticate,
    authorize({roles: ['Admin']}),
    userValidator('changeRoles', 'params'),
    userAccountController.deleteRole);

router.patch('/password',
    authenticate,
    authorize({roles: ['User']}),
    userAccountController.changePassword);

router.get('/user/:login',
    authenticate,
    authorize({roles: ['User', 'Moderator', 'Admin']}),
    userAccountController.getUser);

export default router;