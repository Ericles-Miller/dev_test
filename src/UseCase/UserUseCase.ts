import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { CreateUserDto } from "../DTOs/CreateUserDto";


export class UserUseCase { 
  private readonly repository : Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User); 
  }

  async execute({ firstName, lastName, email }: CreateUserDto) : Promise<User> {
    const user = new User(firstName, lastName, email);
    
    return await this.repository.save(user)
  }
}