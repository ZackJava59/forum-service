import UserAccount from '../model/userAccount.model.js'
export async function createAdmin() {
    let admin = await UserAccount.findById('Admin');
    if (!admin) {
        admin = new UserAccount({
            login: 'admin',
            password: 'admin',
            firstName: 'Admin',
            lastName: 'Admin',
            roles: ['User','Admin', 'Moderator'],
        });
        await admin.save();
    }
}