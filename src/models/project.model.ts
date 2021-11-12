import mongoose from "mongoose";

export interface ProjectDocument extends mongoose.Document {
  uuid: string;
  title: string;
  creator: string;
  type: string;
  people: Array<string>;
  boards: Array<string>;
  issues: Array<string>;
}

const projectSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  creator: { type: String, required: true },
  type: { type: String, required: true },
  people: { type: Array },
  boards: { type: Array },
  issues: { type: Array },
});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel; 
