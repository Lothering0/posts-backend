import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { UserRolesGuard } from "src/user-roles/user-roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { UserRole } from "src/user-roles/user-roles.types";
import { id } from "src/common/types";

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
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Post()
  public create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Post("/ban/:id")
  public ban(@Param("id") userId: id): Promise<User> {
    return this.usersService.banUser(userId);
  }
}
