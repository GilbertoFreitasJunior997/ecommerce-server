import { BaseError } from "./_utils";

export class AuthIncorrectEmailOrPasswordError extends BaseError {
  message = "User not found. Please check your name/email or password";
}

export class AuthUserEmailExists extends BaseError {
  message =
    "There is already an user with this email registered. Please pick another one";
}

export class AuthUserNameExists extends BaseError {
  message =
    "There is already an user with this name registered. Please pick another one";
}

export class AuthPasswordHashError extends BaseError {
  message = "Account could not be verified. Please try again";
}

export class AuthInvalidTokenError extends BaseError {
  message = "Please provide an valid token";
  code = "UNAUTHORIZED" as const;
}
