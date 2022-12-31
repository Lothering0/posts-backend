import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
  });
}

main();
