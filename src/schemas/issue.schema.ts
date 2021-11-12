import { string, tuple, object, TypeOf, array } from "zod";

export const postIssueSchema = object({
  body: object({
    uuid: string({
      required_error: "UUID required",
    }),
    title: string({
      required_error: "Title required",
    }),
    type: string({
      required_error: "Type required",
    }),
    createdAt: string({
      required_error: "date required",
    }),
    creator: string({
      required_error: "Username of creator required",
    }),
    assignee: array(string()),
    deadline: string({
      required_error: "Deadline required",
    }),
    priority: string({
      required_error: "Priority of issue required",
    }),
  }),
});

export const getIssueSchema = object({
  params: object({
    uuid: string({
      required_error: "UUID required for issue",
    }),
  }),
});

export const deleteIssueSchema = object({
  body: object({
    uuid: string({
      required_error: "UUID required for issue",
    }),
  }),
});

export type postIssueInput = TypeOf<typeof postIssueSchema>;
export type getIssueInput = TypeOf<typeof getIssueSchema>;
export type deleteIssueInput = TypeOf<typeof deleteIssueSchema>;
