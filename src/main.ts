import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.use(express.static(path.resolve(__dirname + "/public")));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(port);
}
bootstrap();
