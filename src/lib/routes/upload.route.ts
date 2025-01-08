import { type FileRouter, createUploadthing } from "uploadthing/express";
import { UTApi, UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { env } from "../env";
import type { AuthUser } from "../models/user.model";
import { authUtils } from "../utils/auth.utils";

const f = createUploadthing();

export const utapi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
});

export const uploadRouter = {
  productImageUploader: f({
    image: {
      maxFileCount: 3,
      maxFileSize: "1MB",
    },
  })
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .middleware(({ input }) => {
      let user: AuthUser;

      try {
        user = authUtils.getUserByToken(input.token);
      } catch (error) {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "Please provide a valid token",
          cause: error,
        });
      }

      return {
        userId: user.id,
      };
    })
    .onUploadComplete(() => {
      //
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
