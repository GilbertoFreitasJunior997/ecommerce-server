import { TRPCError } from "@trpc/server";

export type BaseErrorParams = ConstructorParameters<typeof TRPCError>[0];

export class BaseError extends TRPCError {
  constructor(params?: Partial<BaseErrorParams>) {
    super({
      message: params?.message ?? "Something went wrong",
      code: params?.code ?? "BAD_REQUEST",
      cause: params?.cause,
    });
  }
}
