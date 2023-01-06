import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UserNotFoundException } from "./exceptions";
import { id } from "src/common/types";
import { email } from "./users.types";
import { BanUserDto } from "./dto";

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

    if (!user) throw new UserNotFoundException();

    return user;
  }

  public async banUser(id: id, dto: BanUserDto): Promise<User> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) throw new UserNotFoundException();

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();

    return user;
  }

  public async unbanUser(id: id): Promise<User> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) throw new UserNotFoundException();

    user.banned = false;
    user.banReason = null;
    await user.save();

    return user;
  }
}
