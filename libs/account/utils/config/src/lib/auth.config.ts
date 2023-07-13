import { z } from "zod";
import { ConfigType, registerAs } from "@nestjs/config";
import { Inject } from "@nestjs/common";

const authConfigType = z.object({
  AT_JWT_SECRET: z.string(),
  AT_JWT_EXPIRES_IN: z.string(),
  RT_JWT_SECRET: z.string(),
  RT_JWT_EXPIRES_IN: z.string(),
  JWT_SALT: z.string(),
});

authConfigType.parse(process.env);

export const authConfig = registerAs("authConfig", () => ({
  rt_jwt_secret: process.env.RT_JWT_SECRET,
  rt_jwt_expires_in: process.env.RT_JWT_EXPIRES_IN, // A week
  at_jwt_secret: process.env.AT_JWT_SECRET,
  at_jwt_expires_in: process.env.AT_JWT_EXPIRES_IN, // 15 min
  jwt_salt: process.env.JWT_SALT,
}));

export type AuthConfig = ConfigType<typeof authConfig>;

export const InjectAuthConfig = () => Inject(authConfig.KEY);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof authConfigType> {}
  }
}
