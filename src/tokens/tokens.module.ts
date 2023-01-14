import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { TokensService } from "./tokens.service";
import { TokensController } from "./tokens.controller";
import { Tokens } from "./tokens.model";

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    SequelizeModule.forFeature([Tokens]),
    JwtModule.register({})
  ],
  exports: [TokensService, JwtModule]
})
export class TokensModule {}
