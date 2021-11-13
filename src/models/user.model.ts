import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  projects: Array<string>;
  issues: Array<string>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UpdateUserDocument extends mongoose.Document {
  username: string;
  updatedUsername: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    projects: { type: Array },
    issues: { type: Array },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
