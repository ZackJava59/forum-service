import userAccountRepository from "../repositories/userAccount.repository.js";


class userAccountService {

    async addUser(data) {
       return await userAccountRepository.addUser(data);
    }

    async loginUser(data) {
        //TODO login user
    }

    async deleteUserByName(login) {
       return await userAccountRepository.deleteUser(login);

    }

    async updateUserByName(login, data) {
        const updateData = {
            firstName: data.firstName,
            lastName: data.lastName,
        }
        return await userAccountRepository.updateUser(login, updateData);
    }

    async addRole(user, role) {
        // TODO update User by role
    }

    async deleteRole(user, role) {
        // TODO delete User by role
    }

    async changePassword(data) {
        //TODO update password
    }

    async getUserByName(user) {
        //TODO find user by name
    }

}

export default new userAccountService();