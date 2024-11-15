import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import { User } from '../entity/User';
import { CreateUserDto } from '../DTOs/CreateUserDto';
import { AppError } from '../AppError';
import { error } from 'console';
import { plainToClass } from 'class-transformer';


export class UserUseCase { 
  private readonly repository : Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User); 
  }

  async execute({ firstName, lastName, email }: CreateUserDto) : Promise<User> {
   try {

    const userDto = plainToClass(CreateUserDto, { firstName, lastName, email });
    if(userDto) throw new AppError('Invalid data.', 400);

    const user = new User(firstName, lastName, email);
    
    return await this.repository.save(user);
   } catch {
    throw new AppError('Unexpected server error to create a new user', 500);
   }
  }
}