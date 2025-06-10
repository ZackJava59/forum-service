import userAccountService from "../services/userAccount.service.js";

class UserAccountController {

    async registerUser(req, res, next) {
        try {
            const user = await userAccountService.addUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async loginUser(req, res, next) {
        // TODO LoginUser
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userAccountService.deleteUserByName(req.params.login);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userAccountService.updateUserByName(req.params.login, req.body);
            res.status(200).json(user);
        }catch(err) {
            next(err);
        }
    }


}

export default new UserAccountController();