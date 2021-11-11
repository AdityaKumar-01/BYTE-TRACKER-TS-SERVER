import { object, string, TypeOf } from "zod";

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
  }),
});

export const getUserSchema = object({
  body: object({
    username: string({
      required_error: "Username required",
    }),
    password:string({
      required_error:"Password required"
    })
  }),
});

export const updateUserSchema = object({
  body: object({
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

export type postUserInput = Omit<TypeOf<typeof postUserSchema>, "body.confirmPassword">;
export type getUserInput = TypeOf<typeof getUserSchema>;
export type updateUserInput = TypeOf<typeof updateUserSchema>
export type deleteUserInput = TypeOf<typeof deleteUserSchema>;
