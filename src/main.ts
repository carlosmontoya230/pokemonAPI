import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Configurar middleware de validación de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  // Habilitar CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
