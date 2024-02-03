import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Your firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Your lastname is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

  userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

  const User = mongoose.model("User", userSchema);
  export default User;