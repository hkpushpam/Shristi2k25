import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    name: string;
    mobile: string;
    company: Types.ObjectId;
    role: string;
    isActive: boolean;
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanySchema',
        required: [true, "There must be a company which is assigned to the car."]
    },
    role: {
        type: String,
        default: "User",
        enum: [
            "User",
            "Admin",
            "SuperAdmin"
        ],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
})

const UserModel = (mongoose.models.users as mongoose.Model<User>) || mongoose.model<User>("users", userSchema)

export default UserModel
