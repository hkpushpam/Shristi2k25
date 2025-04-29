import mongoose, { Schema, Document, Types} from "mongoose";

export interface Files extends Document {
    name: string;
    embeddings: number[];
    user: Types.ObjectId;
}

export const filesSchema: Schema<Files> = new Schema({
    name: String,
    embeddings: Array(Number),
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: [true, "There must be a company which is assigned to the car."]
    },
})

const fileModel = (mongoose.models.files as mongoose.Model<Files>) || mongoose.model<Files>("files", filesSchema);

export default fileModel;
