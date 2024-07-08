import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";

export const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false; // coz email not registered (not in db)
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false; // email there but password not matching
  }

  return omit(user.toJSON(), "password");
};
