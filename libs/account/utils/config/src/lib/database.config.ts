import {z} from 'zod';
import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

const databaseConfigType = z.object({
  ACCOUNT_DATABASE_URL: z.ostring()
});

databaseConfigType.parse(process.env);

export const databaseConfig = registerAs('databaseConfig', () => ({
  url: process.env.ACCOUNT_DATABASE_URL
}));

export type DatabaseConfig = ConfigType<typeof databaseConfig>;

export const InjectDatabaseConfig = () => Inject(databaseConfig.KEY);


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof databaseConfigType> {
    }
  }
}
