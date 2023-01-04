import { NotFoundException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { id } from "src/common/types";
import { email } from "./users.types";

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
    return await this.usersRepository.findAll();
  }

  public async getUserByEmail(email: email): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { email },
      include: { all: true }
    });

    return user;
  }

  public async banUser(id: id): Promise<User> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) throw new NotFoundException({
      message: "User not found",
      statusCode: HttpStatus.NOT_FOUND
    });

    user.banned = !user.banned;

    await user.save();
    return user;
  }
}
