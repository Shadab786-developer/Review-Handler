import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 10, maxlength: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, maxlength: 400 },
    role: { type: String, enum: ["admin", "user", "owner"], default: "user" },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
