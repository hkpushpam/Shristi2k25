import mongoose, { Schema, Document, Types } from "mongoose";

export interface CreditRequest extends Document {
    user: Types.ObjectId;
    noOfCredit: number;
    reason: string;
}

export const creditRequestSchema: Schema<CreditRequest> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: [true, "User reference is required."],
    },
    noOfCredit: {
        type: Number,
        required: [true, "Number of credits is required."],
    },
    reason: {
        type: String,
        required: [true, "Reason for credit usage is required."],
    },
});

const creditRequestModel =
    (mongoose.models.creditRequests as mongoose.Model<CreditRequest>) ||
    mongoose.model<CreditRequest>("creditRequests", creditRequestSchema);

export default creditRequestModel;
