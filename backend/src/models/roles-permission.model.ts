import { Schema, Document, model } from "mongoose";
import {
  Permissions,
  PermissionType,
  Roles,
  RolesType,
} from "../enums/role-permissions.enum";
import { RolePermissions } from "../utils/roles-permissions";

export interface RolesPermissionDocument extends Document {
  name: RolesType;
  permissions: Array<PermissionType>;
}

const rolesPermissionSchema = new Schema<RolesPermissionDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function (this: RolesPermissionDocument) {
        return RolePermissions[this.name] || [];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RolesPermissionModel = model<RolesPermissionDocument>(
  "RolesPermission",
  rolesPermissionSchema
);
export default RolesPermissionModel;
