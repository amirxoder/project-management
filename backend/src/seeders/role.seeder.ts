import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import RolesPermissionModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/roles-permissions";

const seedRoles = async () => {
  console.log("Seeding roles...");

  try {
    // connect to the database
    await connectDatabase();

    const session = await mongoose.startSession(); // a session object is instantiated
    session.startTransaction(); // this line commences a transactional scope

    console.log("Clearing existing roles and default permissions...");
    await RolesPermissionModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      //   check if the role already exists
      const existingRole = await RolesPermissionModel.findOne({
        name: role,
      }).session(session);

      if (!existingRole) {
        console.log(`Create role: ${role}`);
        // create a new role with permissions
        const newRole = new RolesPermissionModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
      } else {
        console.log(`Role ${role} already exists, skipping...`);
      }
    }

    await session.commitTransaction(); // commit the transaction
    console.log("Roles seeded successfully.");

    session.endSession(); // end the session
    console.log("Session ended.");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

seedRoles()
  .then(() => {
    console.log("Seeding process completed.");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Seeding process failed:", error);
    mongoose.connection.close();
  });
