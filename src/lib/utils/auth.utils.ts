import * as bcrypt from "bcrypt";
import type { CookieOptions, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "../env";
import {
  AuthInvalidTokenError,
  AuthPasswordHashError,
} from "../errors/auth.errors";
import type { AuthUser } from "../models/user.model";

const saltRounds = 10;
const tokenCookieKey = "token";

const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    throw new AuthPasswordHashError({
      cause: error,
    });
  }
};

const checkPassword = async (password: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  } catch (error) {
    throw new AuthPasswordHashError({
      cause: error,
    });
  }
};

const createToken = (user: AuthUser) => {
  const token = jwt.sign(user, env.TOKEN_SECRET);

  return token;
};

const cookieOptions: CookieOptions = {
  secure: true,
  sameSite: "none",
  partitioned: true,
};
const setTokenCookie = (user: AuthUser, res: Response) => {
  const token = createToken(user);
  res.cookie(tokenCookieKey, token, cookieOptions);
};

const clearTokenCookie = (res: Response) => {
  res.clearCookie(tokenCookieKey, cookieOptions);
};

const getUserByToken = (token: string): AuthUser => {
  if (!token || typeof token !== "string") {
    throw new AuthInvalidTokenError();
  }

  let user: AuthUser;
  try {
    user = jwt.verify(token, env.TOKEN_SECRET) as AuthUser;
  } catch (error) {
    throw new AuthInvalidTokenError({
      cause: error,
    });
  }

  return user;
};

const getUserByRequest = (req: Request): AuthUser => {
  const token = req.cookies[tokenCookieKey];

  return getUserByToken(token);
};

export const authUtils = {
  hashPassword,
  checkPassword,
  createToken,
  setTokenCookie,
  clearTokenCookie,
  getUserByToken,
  getUserByRequest,
};
