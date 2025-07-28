import mongoose, { model, Schema, Document } from "mongoose";
import { RolesPermissionDocument } from "./roles-permission.model";

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  rolePermissions: RolesPermissionDocument;
  joinedAt: Date;
}

export const memberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rolePermissions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RolesPermission",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = model<MemberDocument>("Member", memberSchema);
export default MemberModel;
