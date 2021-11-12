import { DocumentDefinition } from "mongoose";

import ProjectModel, { ProjectDocument } from "../models/project.model";

export const postProjectService = async (
  input: DocumentDefinition<ProjectDocument>
) => {
  try {
    await ProjectModel.create(input);
    return { status: 201, data: null, msg: "OK" };
  } catch (error: any) {
    return { status: 409, data: null, msg: error.message };
  }
};

export const getProjectService = async (
  input: DocumentDefinition<
    Omit<
      ProjectDocument,
      "title" | "creator" | "type" | "people" | "boards" | "issues"
    >
  >
) => {
  try {
    const proj = ProjectModel.find({ uuid: input["uuid"] });
    return { status: 200, data: proj, msg: "Found" };
  } catch (error: any) {
    return { status: 409, data: null, msg: error.message };
  }
};

export const deleteProjectService  = async(
   input: DocumentDefinition<
    Omit<
      ProjectDocument,
      "title" | "creator" | "type" | "people" | "boards" | "issues"
    >
  >
) =>{
     const user = await ProjectModel.deleteOne({ uuid: input["uuid"] });

     if (user.acknowledged) return { status: 200, data: null, msg: "Deleted" };
     else return { status: 409, data: null, msg: "Cannot delete" };
}
