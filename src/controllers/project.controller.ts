import { Request, Response } from "express";
import {
  getProjectService,
  postProjectService,
  deleteProjectService,
} from "../services/project.service";

import {
  postProjectInput,
  getProjectInput,
  deleteProjectInput,
} from "./../schemas/project.schema";

export const postProjectHandler = async (
  req: Request<{}, {}, postProjectInput["body"]>,
  res: Response
) => {
  try {
    const reply = await postProjectService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const getProjectHandler = async (
  req: Request<getProjectInput["params"]>,
  res: Response
) => {
  
  try {
    const id = req.params.uuid;
    const reply = await getProjectService({ uuid:id });
    return res.send(reply);
  } catch (error: any) {
   
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const deleteProjectHandler = async (
  req: Request<{}, {}, deleteProjectInput["body"]>,
  res: Response
) => {
  try {
    const reply = await deleteProjectService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};
