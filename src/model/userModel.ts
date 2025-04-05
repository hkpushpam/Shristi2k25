import mongoose, { Schema, Document} from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    name: string;
    mobile: string;
    role: string;
    credit_left: number;
    isActive: boolean;
    lastLogin: Date;
}

export const userSchema: Schema<User> = new Schema({
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    mobile: {
        type: String,
        required: [true, "Plese provide a mobile number"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Please use a valid Email Address"]
    },
    credit_left:{
        type: Number,
    },
    role: {
        type: String,
        default: "User",
        enum: [
            "User",
            "Admin",
        ],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastLogin: Date
})

const UserModel = (mongoose.models.users as mongoose.Model<User>) || mongoose.model<User>("users", userSchema)

export default UserModel
