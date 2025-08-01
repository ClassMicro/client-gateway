import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exception/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('main-gateway')
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalFilters(new RpcCustomExceptionFilter())
  await app.listen(envs.port);
logger.log(`Gateway-clienti is running on port ${envs.port}`);
}
bootstrap();
