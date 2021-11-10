import {Express, Request, Response} from 'express';
import validateResource from './middlewares/validateResource.middleware';


const routes = (app:Express) =>{
    app.get("/health-check", (req:Request, res:Response) =>{
        res.send({status:200,data:null,msg:"All good"})
    })

    // user related routes
    app.post("/api/post-user", validateResource(postUserSchema), postUserHandler);
    app.get("/api/get-user/:username", validateResource(getUserSchema), getUserHandler);
    app.patch("/api/update-user", validateResource(updateUserSchema), updateUserHandler);
    app.delete("/api/delete-user", validateResource(deleteUserSchema), deleteUserHandler);

    // project related routes
    app.post("/api/post-project", validateResource(postProjectSchema), postProjectHandler);
    app.get("/api/get-project/:projectID", validateResource(getProjectSchema), getProjectHandler);
    app.patch("/api/update-project", validateResource(updateProjectSchema), updateProjectHandler);
    app.delete("/api/delete-project", validateResource(deleteProjectSchema), deleteProjectHandler);

    // issues related routes
    app.post("/api/post-issue", validateResource(postIssueSchema), postIssueHandler);
    app.get("/api/get-issue/:issueID", validateResource(getIssueSchema), getIssueHandler);
    app.patch("/api/update-issue", validateResource(updateIssueSchema), updateIssueHandler);
    app.delete("/api/delete-issue", validateResource(de;eteIssueSchema), deleteIssueHandler);

    

}

export default routes;