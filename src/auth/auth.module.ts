import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const JWTOptions: JwtModuleOptions = {
  secret: process.env.PRIVATE_KEY || "secret",
  signOptions: {
    expiresIn: "24h"
  }
};

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register(JWTOptions)
  ]
})
export class AuthModule {}
