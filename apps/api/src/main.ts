import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      `This is the API for a Investment Portfolio Management system. Every task route requires the user to be authenticated. To get your Bearer token, create an account and login, and one will be provided to you. To get it, just log in with the front end, and check the console, it will be printed there. Don't forget to add your token to the Authorize field on Swagger API Docs. Token Format: 

      Bearer <JWT>

      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter the Bearer token you got by signing in. Format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
