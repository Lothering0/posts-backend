import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { TokensModule } from "src/tokens";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    TokensModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
