import { Module } from "@nestjs/common";
import { UsersModule } from "src/users";
import { TokensModule } from "src/tokens";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TokensModule],
  exports: [AuthService]
})
export class AuthModule {}
