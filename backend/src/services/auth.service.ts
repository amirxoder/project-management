import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RolesPermissionModel from "../models/roles-permission.model";
import { Roles } from "../enums/role-permissions.enum";
import { NotFoundException } from "../utils/appError";
import MemberModel from "../models/memeber.model";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { provider, displayName, providerId, picture, email } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    console.log(`starting transaction for provider: ${provider}`);
    let user = await UserModel.findOne({
      email,
    }).session(session);
    if (!user) {
      // Create a new user if not found
      user = new UserModel({
        displayName,
        email,
        provider,
        providerId,
        picture,
      });
      await user.save({ session });

      // Create a new account for the user
      const account = new AccountModel({
        userId: user._id,
        provider,
        providerId,
      });
      await account.save({ session });

      // create new workspace for the user
      const workspace = new WorkspaceModel({
        name: `${user.name}'s Workspace`,
        description: `${user.name}'s personal workspace`,
        owner: user._id,
      });
      await workspace.save({ session });

      // Assign the owner role to the user in the workspace
      const ownerRole = await RolesPermissionModel.findOne({
        name: Roles.OWNER,
      }).session(session);

      if (!ownerRole) throw new NotFoundException("Owner role not found");

      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        rolePermissions: ownerRole._id,
        joinedAt: new Date(),
      });
      await member.save({ session });

      // Set the current workspace for the user
      // initiated workspace
      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }

    await session.commitTransaction();
    console.log(`transaction committed for provider: ${provider}`);
    return { user };
  } catch (error) {
    await session.abortTransaction();
    console.error(`transaction aborted for provider: ${provider}`, error);
    throw error;
  }
};
