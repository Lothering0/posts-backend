import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  ParseIntPipe
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { UserRolesGuard } from "src/user-roles/user-roles.guard";
import { CreateUserDto, BanUserDto } from "./dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { UserRole } from "src/user-roles/user-roles.types";
import { id } from "src/common/types";
import { ApiResponseException } from "src/exceptions";
import { ForbiddenRoleException } from "src/user-roles/exceptions";
import { UserNotFoundException } from "./exceptions";
import { EmailExistException } from "src/auth/exceptions";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiResponseException<UserRole[]>(ForbiddenRoleException, [UserRole.ADMIN])
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Get()
  public getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponseException<UserRole[]>(ForbiddenRoleException, [UserRole.ADMIN])
  @ApiResponseException(EmailExistException)
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Post()
  public create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the user to be blocked",
    example: 1,
    required: true
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponseException<UserRole[]>(ForbiddenRoleException, [UserRole.ADMIN])
  @ApiResponseException(UserNotFoundException)
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Post("/ban/:id")
  public ban(
    @Param("id", ParseIntPipe) userId: id,
    @Body() banUserDto: BanUserDto
  ): Promise<User> {
    return this.usersService.banUser(userId, banUserDto);
  }

  @ApiOperation({ summary: "Unban user" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the user to be unblocked",
    example: 1,
    required: true
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponseException<UserRole[]>(ForbiddenRoleException, [UserRole.ADMIN])
  @ApiResponseException(UserNotFoundException)
  @UseGuards(AuthGuard, UserRolesGuard(UserRole.ADMIN))
  @Post("/unban/:id")
  public unban(@Param("id", ParseIntPipe) userId: id): Promise<User> {
    return this.usersService.unbanUser(userId);
  }
}
