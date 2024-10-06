import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { corsOptions } from './config/cors.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(9981);
}

bootstrap();
