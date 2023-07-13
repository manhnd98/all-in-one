import {z} from 'zod';
import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

const accountConfigType = z.object({
  RABBITMQ_USER: z.ostring(),
  RABBITMQ_PWD: z.ostring(),
  RABBITMQ_HOST: z.ostring(),
  RABBITMQ_PORT: z.ostring()
});

accountConfigType.parse(process.env);

export const rabbitmqConfig = registerAs('rabbitmqConfig', () => ({
  rabbitmq: {
    user: process.env.RABBITMQ_USER || 'user',
    pwd: process.env.RABBITMQ_PWD || 'bitnami',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || '5672',
    get url() {
      return `amqp://${this.user}:${this.pwd}@${this.host}:${this.port}`;
    }
  }
}));

export type RabbitmqConfig = ConfigType<typeof rabbitmqConfig>;

export const InjectRabbitmqConfig = () => Inject(rabbitmqConfig.KEY);


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof accountConfigType> {
    }
  }
}
