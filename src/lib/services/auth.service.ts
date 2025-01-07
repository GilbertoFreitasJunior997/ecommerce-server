import type { AuthSignInDTO, AuthSignUpDTO } from "../../dtos/auth.dto";
import type { Context } from "../../trpc/context";
import { BaseError } from "../errors/_utils";
import {
  AuthIncorrectEmailOrPasswordError,
  AuthUserEmailExists,
  AuthUserNameExists,
} from "../errors/auth.errors";
import type { AuthUser } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";
import { authUtils } from "../utils/auth.utils";

export const authService = {
  signUp: async (
    { name, email, password }: AuthSignUpDTO,
    { res }: Context,
  ): Promise<AuthUser> => {
    if (password.length < 6) {
      throw new BaseError({
        message: "Password must be at least 6 characters",
      });
    }

    const userWithSameName = await userRepository.getByColumn("name", name);
    if (userWithSameName) {
      throw new AuthUserNameExists();
    }

    const userWithSameEmail = await userRepository.getByColumn("email", email);
    if (userWithSameEmail) {
      throw new AuthUserEmailExists();
    }

    const hashedPassword = await authUtils.hashPassword(password);

    const { password: _, ...user } = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    authUtils.setTokenCookie(user, res);

    return user;
  },
  signIn: async (
    { emailOrName, password }: AuthSignInDTO,
    { res }: Context,
  ) => {
    const dbUser = await userRepository.getByEmailOrName(emailOrName);
    if (!dbUser) {
      throw new AuthIncorrectEmailOrPasswordError();
    }

    const isMatch = await authUtils.checkPassword(password, dbUser.password);
    if (!isMatch) {
      throw new AuthIncorrectEmailOrPasswordError();
    }

    const { password: _, ...user } = dbUser;

    authUtils.setTokenCookie(user, res);

    return user;
  },
  signOff: ({ res }: Context) => {
    authUtils.clearTokenCookie(res);
  },
};
