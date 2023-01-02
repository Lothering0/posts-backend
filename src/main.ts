import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Posts BACKEND")
    .setDescription("Posts API documentation")
    .setVersion("1.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api", app, swaggerDocument);
}

async function main(): Promise<void> {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
  });
}

main();
