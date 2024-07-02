import userModel, { UserInput } from "../models/user.model";

export const createUser = async (input: UserInput) => {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};
