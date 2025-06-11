import userAccountRepository from "../repositories/userAccount.repository.js";


class userAccountService {

    async register(login) {
        return await userAccountRepository.register(login);
    }

    async getUser(login) {
        const userAccount = await userAccountRepository.findUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async deleteUser(login) {
        const userAccount = await userAccountRepository.deleteUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async updateUser(login, user) {
        const userAccount = await userAccountRepository.updateUser(login, user);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async addRole(login, role) {
        const userAccount = await userAccountRepository.addRole(login, role);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async deleteRole(login, role) {
        const userAccount = await userAccountRepository.deleteRole(login, role);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async changePassword(login, newPassword) {
        const userAccount = await userAccountRepository.changePassword(login, newPassword);
    }
}

export default new userAccountService();