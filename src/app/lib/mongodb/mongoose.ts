import mongoose from "mongoose";

let initialized = false;

export const connect = async (): Promise<void> => {
  mongoose.set("strictQuery", false);

  if (initialized) {
    console.log("Already connected to MongoDB");
    return;
  }

  const mongoDbUri = process.env.MONGODB_URI;

  if (!mongoDbUri) {
    console.error("MONGODB_URI environment variable is not defined");
    return;
  }

  try {
    await mongoose.connect(mongoDbUri, {
      dbName: "blog_app_with_db",
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions); // Cast to ConnectOptions for TypeScript
    console.log("Connected to MongoDB");
    initialized = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
