import { NestFactory } from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Posts BACKEND")
    .setDescription("Posts API documentation")
    .setVersion("1.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, swaggerDocument);

  await app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
  });
}

main();
