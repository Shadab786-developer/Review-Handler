import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    ratings: { type: Number },
    ownerId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export const Store = mongoose.model("Store", storeSchema);
