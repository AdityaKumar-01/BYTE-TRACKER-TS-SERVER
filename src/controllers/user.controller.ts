import { Request, Response } from "express";

import {
  postUserService,
  getUserService,
  updateUserActivityService,
  deleteUserService,
  updateUserDetailService,
} from "./../services/user.service";
import {
  postUserInput,
  getUserInput,
  updateUserActivityInput,
  updateUserDetailInput,
  deleteUserInput,
} from "./../schemas/user.schema";

export const postUserHandler = async (
  req: Request<{}, {}, postUserInput["body"]>,
  res: Response
) => {
  try {
    const reply = await postUserService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const getUserHandler = async (
  req: Request<{}, {}, getUserInput["body"]>,
  res: Response
) => {
  try {
    const reply = await getUserService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const updateUserActivityHandler = async (
  req: Request<updateUserActivityInput["params"]>,
  res: Response
) => {
  try {
    const username = req.params.username;
    const reply = await updateUserActivityService({ username, ...req.body });
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const updateUserDetailHandler = async (
  req: Request<{}, {}, updateUserDetailInput["body"]>,
  res: Response
) => {
  try {
    const reply = await updateUserDetailService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const deleteUserHandler = async (
  req: Request<{}, {}, deleteUserInput["body"]>,
  res: Response
) => {
  try {
    const reply = await deleteUserService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};
