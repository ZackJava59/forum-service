import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    roles: {
        type: [{type: String, enum: ["USER", "MODERATOR"]}],
        default: ['USER'],
    },
},{
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
        }
    },
})

export default mongoose.model("User", userSchema, 'Users');