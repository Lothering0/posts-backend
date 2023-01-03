import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @UseGuards(AuthGuard)
  @Get()
  public getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }
}
