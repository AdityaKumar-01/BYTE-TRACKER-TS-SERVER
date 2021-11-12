import mongoose from "mongoose";

export interface IssueDocument extends mongoose.Document {
  uuid: string;
  title: string;
  type: string;
  createdAt: Date;
  creator: string;
  assignee: Array<string>;
  deadline: Date;
  priority: string;
}

const issueSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  creator: { type: String, required: true },
  assignee: { type: Array },
  deadline: { type: Date, required: true },
  priority: { type: String, required: true },
});

const IssueModel = mongoose.model("Issue", issueSchema)

export default IssueModel