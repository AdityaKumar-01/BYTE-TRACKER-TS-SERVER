import { Express, Request, Response } from "express";

// middlewares
import validateResource from "./middlewares/validateResource.middleware";

// controllers
import {
  getUserHandler,
  postUserHandler,
  updateUserActivityHandler,
  updateUserDetailHandler,
  deleteUserHandler,
} from "./controllers/user.controller";

import {
  getProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
} from "./controllers/project.controller";

import {
  getIssueHandler,
  postIssueHandler,
  deleteIssueHandler,
} from "./controllers/issue.controller";

// Schemas
import {
  postUserSchema,
  getUserSchema,
  updateUserActivitySchema,
  updateUserDetailSchema,
  deleteUserSchema,
} from "./schemas/user.schema";

import {
  postProjectSchema,
  getProjectSchema,
  deleteProjectSchema,
} from "./schemas/project.schema";

import {
  postIssueSchema,
  getIssueSchema,
  deleteIssueSchema,
} from "./schemas/issue.schema";

const routes = (app: Express) => {
  app.get("/health-check", (req: Request, res: Response) => {
    res.send({ status: 200, data: null, msg: "All good" });
  });

  // user related routes
  app.post("/api/post-user", validateResource(postUserSchema), postUserHandler);
  app.post("/api/get-user", validateResource(getUserSchema), getUserHandler);
  app.patch(
    "/api/update-user-activity/:username",
    validateResource(updateUserActivitySchema),
    updateUserActivityHandler
  );
  app.patch(
    "/api/update-user-detail",
    validateResource(updateUserDetailSchema),
    updateUserDetailHandler
  );
  app.delete(
    "/api/delete-user",
    validateResource(deleteUserSchema),
    deleteUserHandler
  );

  // project related routes
  app.post(
    "/api/post-project",
    validateResource(postProjectSchema),
    postProjectHandler
  );
  app.get(
    "/api/get-project/:uuid",
    validateResource(getProjectSchema),
    getProjectHandler
  );
  // app.patch(
  //   "/api/update-project",
  //   validateResource(updateProjectSchema),
  //   updateProjectHandler
  // );
  app.delete(
    "/api/delete-project",
    validateResource(deleteProjectSchema),
    deleteProjectHandler
  );

  // issues related routes
  app.post(
    "/api/post-issue",
    validateResource(postIssueSchema),
    postIssueHandler
  );
  app.get(
    "/api/get-issue/:uuid",
    validateResource(getIssueSchema),
    getIssueHandler
  );
  // app.patch(
  //   "/api/update-issue",
  //   validateResource(updateIssueSchema),
  //   updateIssueHandler
  // );
  app.delete(
    "/api/delete-issue",
    validateResource(deleteIssueSchema),
    deleteIssueHandler
  );
};

export default routes;
