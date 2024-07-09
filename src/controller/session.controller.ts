import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  //validate the user's password

  const user = await validatePassword(req.body); // EVERY REQ BODY MUST BE VALIDATED TRHOUGH A SCHEMA BEFORE ACCEPTING IN THE CONTROLLER.

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //create session (since password is correct)

  const session = await createSession(user._id, req.get("user-agent") || "");

  //create access token

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenttl") } //15 mins
  );
  //create refresh token

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenttl") } //15 mins
  );

  //return access and refresh tokens

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: false });

  return res.send(sessions);
};
