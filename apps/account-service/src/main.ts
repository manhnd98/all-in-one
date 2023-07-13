/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {RabbitmqConfig, rabbitmqConfig} from "@all-in-one/account/utils/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose']
  });

  // pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // config swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Account service')
    .setDescription('The account service API description')
    .setVersion('1.0')
    .addTag('account')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  // config rabbitmq & microservice
  const accountConfigService = app.get<RabbitmqConfig>(rabbitmqConfig.KEY);

  app.connectMicroservice<MicroserviceOptions>( {
    transport: Transport.RMQ,
    options: {
      urls: [accountConfigService.rabbitmq.url],
      queue: 'account_queue',
      queueOptions: {
        durable: false
      },
    }
  });

  // bootstrapping
  app.enableShutdownHooks();

  await app.startAllMicroservices();
  Logger.log('Account service is running');

  await app.listen(3300, () => {
    Logger.log('Account service is listening on port 3300, try http://localhost:3300/api');
  });
}

bootstrap();
