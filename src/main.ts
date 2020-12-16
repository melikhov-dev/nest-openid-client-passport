import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { AuthFilter } from './common/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.useGlobalFilters(new AuthFilter());
  await app.listen(3000);
}
bootstrap();
