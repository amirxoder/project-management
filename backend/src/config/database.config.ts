import mongoose from "mongoose";
import appConfig from "./app.config";

const connectDatabase = async () => {
  console.log("Connecting to database...");

  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected");
    return;
  }

  try {
    await mongoose.connect(appConfig.MONGO_URI);
    console.log("Data base connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDatabase;
