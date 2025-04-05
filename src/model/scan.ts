import mongoose, { Schema, Document } from "mongoose";

export interface Scan extends Document {
    created_at: Date;
    no_of_scans: number;
}

export const scanSchema: Schema<Scan> = new Schema({
    created_at: {
        type: Date,
        default: Date.now,
    },
    no_of_scans: {
        type: Number,
        required: [true, "Number of scans is required."],
    },
});

const scanModel =
    (mongoose.models.scans as mongoose.Model<Scan>) ||
    mongoose.model<Scan>("scans", scanSchema);

export default scanModel;
