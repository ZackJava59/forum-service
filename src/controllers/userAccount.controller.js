import userAccountService from "../services/userAccount.service.js";

class UserAccountController {

    async register(req, res, next) {
        try {
            const userAccount = await userAccountService.register(req.body);
            res.status(201).json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        const userAccount = await userAccountService.getUser(req.principal.username)
        res.json(userAccount);
    }

    async changePassword(req, res, next) {
        await userAccountService.changePassword(req.principal.username, req.headers['x-password']);
        res.sendStatus(204);
    }

    async deleteUser(req, res, next) {
        try {
            const userAccount = await userAccountService.deleteUser(req.params.login);
            res.status(200).json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userAccount = await userAccountService.updateUser(req.params.login, req.body);
            res.status(200).json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async addRole(req, res, next) {
        try {
            const userRoles = await userAccountService.addRole(req.params.login, req.params.role);
            res.status(200).json(userRoles);
        } catch (err) {
            next(err);
        }
    }

    async deleteRole(req, res, next) {
        const {login, role} = req.params;
        try {
            const userRoles = await userAccountService.deleteRole(login, role);
            res.status(200).json(userRoles);
        } catch (err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const userAccount = await userAccountService.getUser(req.params.login);
            res.status(200).json(userAccount);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserAccountController();