import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User)
    private readonly usersRepository: typeof User
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(dto);
  }

  public async getAllUsers(): Promise<User[]> {
    console.log(this.usersRepository);
    return await this.usersRepository.findAll();
  }
}
