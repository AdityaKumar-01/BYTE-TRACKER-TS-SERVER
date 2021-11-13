import { object, string, TypeOf, array } from "zod";

export const postUserSchema = object({
  body: object({
    username: string({
      required_error: "Username required",
    }),
    password: string({
      required_error: "Password required",
    }),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
    email: string().email({ message: "Invalid email address" }),
    projects: array(string()),
    issues: array(string()),
  }),
});

export const getUserSchema = object({
  body: object({
    username: string({
      required_error: "Username required",
    }),
    password: string({
      required_error: "Password required",
    }),
  }),
});

export const updateUserActivitySchema = object({
  body: object({
    projects: string(),
    issues: string(),
  }),
  params: object({
    username: string({
      required_error: "Username required",
    }),
  }),
});

export const deleteUserSchema = object({
  body: object({
    username: string({
      required_error: "Username required",
    }),
    password: string({
      required_error: "Password required",
    }),
  }),
});

export type postUserInput = Omit<
  TypeOf<typeof postUserSchema>,
  "body.confirmPassword"
>;
export type getUserInput = TypeOf<typeof getUserSchema>;
export type updateUserActivityInput = TypeOf<typeof updateUserActivitySchema>;
export type deleteUserInput = TypeOf<typeof deleteUserSchema>;
