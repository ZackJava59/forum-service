import UserAccount from '../model/userAccount.model.js'
import bcrypt from "bcrypt";

class UserAccountRepository {

    async register(login) {
        const userAccount = new UserAccount(login);
        return userAccount.save();
    }

    async findUser(login) {
        return UserAccount.findById(login)
    }

    async deleteUser(login) {
        return UserAccount.findByIdAndDelete(login);
    }

    async updateUser(login, updateData) {
        return UserAccount.findByIdAndUpdate(login, updateData, {new: true})
    }

    async addRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$addToSet: {roles: role}}, {new: true});
    }

    async deleteRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$pull: {roles: role}}, {new: true});
    }

    async changePassword(login, password) {
        const salt = await bcrypt.genSalt(12);
        password = await bcrypt.hash(password, salt);
        return UserAccount.findByIdAndUpdate(login, {$set: {password}}, {new: true})
    }
}

export default new UserAccountRepository();