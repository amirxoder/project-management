import mongoose, { model, Schema, Document } from "mongoose";
import { RolesPermissionDocument } from "./roles-permission.model";

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  rolePermissions: RolesPermissionDocument;
  workspaceId: mongoose.Types.ObjectId;
  joinedAt: Date;
}

export const memberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    rolePermissions: {
      type: Schema.Types.ObjectId,
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
