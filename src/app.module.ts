import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import {
  ForbiddenRoleExceptionFilter
} from "./user-roles/exceptions/forbidden-role.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ForbiddenRoleExceptionFilter
    }
  ]
})
export class AppModule {}
