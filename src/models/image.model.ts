import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  name: string;
  uploadDate: Date;
  url: string;
}

const ImageSchema: Schema = new Schema({
  name: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  url: { type: String, required: true },
});

export const ImageModel = mongoose.model<IImage>("Image", ImageSchema);
