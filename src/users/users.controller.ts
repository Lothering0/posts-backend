import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  public create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }
}
