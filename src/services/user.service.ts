import { DocumentDefinition } from "mongoose";

import UserModel, { UserDocument } from "../models/user.model";

import bcrypt from "bcrypt";

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
    return { status: 400, data: null, msg: error };
  }
};

export const getUserService = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" | "email">
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

// export const updateUserService = async (input: DocumentDefinition<Omit<UserDocument, "password" | "createdAt" | "updatedAt" | "comparePassword" | "email">>)
export const deleteUserService = async (
  input: DocumentDefinition<
    Omit<
      UserDocument,
      "password" | "createdAt" | "updatedAt" | "comparePassword" | "email"
    >
  >
) => {
  const user = await UserModel.deleteOne({ username: input["username"] });

  if (user.acknowledged) return { status: 200, data: null, msg: "Deleted" };
  else return { status: 409, data: null, msg: "Cannot delete" };
};
