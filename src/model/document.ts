import mongoose, { Schema, Document, Types} from "mongoose";

export interface files extends Document {
    name: string;
    embeddings: number[];
    user: Types.ObjectId;
}

export const filesSchema: Schema<files> = new Schema({
    name: String,
    embeddings: Array(Number),
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: [true, "There must be a company which is assigned to the car."]
    },
})

const fileModel = (mongoose.models.users as mongoose.Model<files>) || mongoose.model<files>("users", filesSchema);

export default fileModel;
