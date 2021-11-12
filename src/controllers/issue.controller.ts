import { Request, Response } from "express";
import log from "./../utils/logger.util";

import {
  postIssueService,
  getIssueService,
  deleteIssueService,
} from "./../services/issue.service";
import {
  postIssueInput,
  getIssueInput,
  deleteIssueInput,
} from "./../schemas/issue.schema";

export const postIssueHandler = async (
  req: Request<{}, {}, postIssueInput["body"]>,
  res: Response
) => {
  try {
    const reply = await postIssueService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const getIssueHandler = async (
  req: Request<getIssueInput["params"]>,
  res: Response
) => {
  try {
    const uuid = req.params.uuid;
    const reply = await getIssueService({ uuid });
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};

export const deleteIssueHandler = async (
  req: Request<{}, {}, deleteIssueInput["body"]>,
  res: Response
) => {
  try {
    const reply = await deleteIssueService(req.body);
    return res.send(reply);
  } catch (error: any) {
    return res.send({ status: 409, data: null, msg: error.message });
  }
};
