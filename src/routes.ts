import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler); // when hitting the create user api, the request payload sent from client to server will have the email id and password written by user

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  ); // returns refresh token and access token
};

export default routes;
