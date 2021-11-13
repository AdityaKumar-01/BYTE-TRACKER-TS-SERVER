import { DocumentDefinition } from "mongoose";

import UserModel, {
  UserDocument,
  UpdateUserDocument,
} from "../models/user.model";

import bcrypt from "bcrypt";
import config from "config";

export const postUserService = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    let users = await UserModel.find({ username: input["username"] });
    if (users.length > 0)
      return { status: 409, data: null, msg: "User already exist" };
    else {
      await UserModel.create(input);
      return { status: 201, data: null, msg: "OK" };
    }
  } catch (error: any) {
    return { status: 400, data: null, msg: error.message };
  }
};

export const getUserService = async (
  input: DocumentDefinition<
    Omit<
      UserDocument,
      | "createdAt"
      | "updatedAt"
      | "comparePassword"
      | "email"
      | "projects"
      | "issues"
    >
  >
) => {
  let user = await UserModel.find({
    username: input["username"],
  });

  if (
    user.length === 1 &&
    bcrypt.compareSync(input["password"], user[0].password)
  )
    return { status: 200, data: user, msg: "OK" };
  else return { status: 404, data: null, msg: "User not Found" };
};

export const updateUserDetailService = async (
  input: DocumentDefinition<UpdateUserDocument>
) => {
  try {
    if (input.password) {
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
      const hash = await bcrypt.hashSync(input.password, salt);

      const data = {
        username: input.updatedUsername,
        email: input.email,
        password: hash,
      };
      const result = await UserModel.updateOne(
        { username: input.username },
        { $set: data }
      );
      if (result.acknowledged) return { staus: 200, data: data, msg: "OK" };
      else throw new Error("Cannot Update");
    } else {
      const data = {
        username: input.updatedUsername,
        email: input.email,
      };
      const result = await UserModel.updateOne(
        { username: input.username },
        { $set: data }
      );
      if (result.acknowledged) return { staus: 200, data: data, msg: "OK" };
      else throw new Error("Cannot Update");
    }
  } catch (error: any) {
    return { status: 409, data: null, msg: error.message };
  }
};
export const updateUserActivityService = async (
  input: DocumentDefinition<
    Omit<
      UserDocument,
      "password" | "createdAt" | "updatedAt" | "comparePassword" | "email"
    >
  >
) => {
  let user = await UserModel.find({
    username: input["username"],
  });

  if (user.length === 1) {
    if (input.projects) {
      const user = await UserModel.findOneAndUpdate(
        { username: input.username },
        { $push: { projects: input.projects } }
      );
    }
    if (input.issues) {
      const user = await UserModel.findOneAndUpdate(
        { username: input.username },
        { $push: { issues: input.issues } }
      );
    }

    return { status: 200, data: null, msg: "OK" };
  } else return { status: 404, data: null, msg: "User not Found" };
};

export const deleteUserService = async (
  input: DocumentDefinition<
    Omit<
      UserDocument,
      | "password"
      | "createdAt"
      | "updatedAt"
      | "comparePassword"
      | "email"
      | "projects"
      | "issues"
    >
  >
) => {
  const user = await UserModel.deleteOne({ username: input["username"] });

  if (user.deletedCount) return { status: 200, data: null, msg: "Deleted" };
  else return { status: 409, data: null, msg: "Cannot delete" };
};
