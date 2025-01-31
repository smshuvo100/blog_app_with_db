import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

interface EmailAddress {
  email_address: string;
}

export const createOrUpdateUser = async (id: string, first_name: string, last_name: string, image_url: string, email_addresses: EmailAddress[], username: string): Promise<typeof User | null> => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0]?.email_address,
          username
        }
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
