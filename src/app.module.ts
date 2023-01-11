import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { ForbiddenRoleExceptionFilter } from "./user-roles/exceptions";
import { ValidationPipe } from "./pipes/validation.pipe";
import { ResponseInterceptor } from "./interceptors/response.interceptor";

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
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ForbiddenRoleExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
