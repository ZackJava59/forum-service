import User from '../model/user.model.js'

class UserAccountRepository {

    async addUser(data) {
        const user = new User(data);
        return user.save();
    }

    async loginUser(data) {
        //TODO
    }

    async deleteUser(login) {
        return User.findOneAndDelete({login: login});
    }

    async updateUser(login, updateData) {
        return User.findOneAndUpdate({login: login}, {firstName: updateData.firstName, lastName: updateData.lastName}, {new: true})
    }
}

export default new UserAccountRepository();