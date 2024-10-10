import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = app.get(Logger);
  const appConfig = config.get('application');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Prompt Example')
    .setDescription('The prompt API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger/docs', app, document);

  await app.listen(appConfig.port, () => {
    logger.log(`App is running on port: ${appConfig.port}`);
  });
}
bootstrap();
