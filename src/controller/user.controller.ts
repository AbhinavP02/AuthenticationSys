import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return user;
  } catch (e: any) {
    logger.error(e);
    return res.sendStatus(409).send(e.message);
  }
};
