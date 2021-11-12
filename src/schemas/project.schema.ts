import { string, object, TypeOf, tuple } from "zod";

export const postProjectSchema = object({
  body: object({
    uuid: string({
      required_error: "UUID required",
    }),
    title: string({
      required_error: "Title required",
    }),
    creator: string({
      required_error: "Creator name required",
    }),
    type: string({
      required_error: "Type of project required",
    }),
    people: tuple([]),
    boards: tuple([]),
    issues: tuple([]),
  }),
});

export const getProjectSchema = object({
  params: object({
    uuid: string({
      required_error: "UUID required",
    }),
  }),
});

export const deleteProjectSchema = object({
  body: object({
    uuid: string({
      required_error: "UUID required",
    }),
  }),
});

export type postProjectInput = TypeOf<typeof postProjectSchema>
export type getProjectInput = TypeOf<typeof getProjectSchema>;
export type deleteProjectInput = TypeOf<typeof deleteProjectSchema>;