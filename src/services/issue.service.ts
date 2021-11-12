import { DocumentDefinition } from "mongoose";

import IssueModel, { IssueDocument } from "../models/issue.model";

export const postIssueService = async (
  input: DocumentDefinition<IssueDocument>
) => {
  try {
    await IssueModel.create(input);
    return { status: 201, data: null, msg: "OK" };
  } catch (error: any) {
    console.log(error);
    return { status: 409, data: null, msg: error.message };
  }
};

export const getIssueService = async (
  input: DocumentDefinition<
    Omit<
      IssueDocument,
      | "title"
      | "creator"
      | "type"
      | "createdAt"
      | "assignee"
      | "priority"
      | "deadline"
    >
  >
) => {
  try {
    const issue = await IssueModel.find({ uuid: input["uuid"] });
    if (issue.length === 1) return { status: 200, data: issue, msg: "Found" };
    else return { status: 404, data: null, msg: "Not Found" };
  } catch (error: any) {
    return { status: 409, data: null, msg: error.message };
  }
};

export const deleteIssueService = async (
  input: DocumentDefinition<
    Omit<
      IssueDocument,
      | "title"
      | "creator"
      | "type"
      | "createdAt"
      | "assignee"
      | "priority"
      | "deadline"
    >
  >
) => {
  const issue = await IssueModel.deleteOne({ uuid: input["uuid"] });

  if (issue.deletedCount) return { status: 200, data: null, msg: "Deleted" };
  else return { status: 409, data: null, msg: "Cannot delete" };
};
