import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://teste-paggo-front.vercel.app'],
    credentials: true,
  })
  const port = process.env.PORT || 5000
  await app.listen(port);
}
bootstrap();
