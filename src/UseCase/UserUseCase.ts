import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import { User } from '../entity/User';
import { CreateUserDto } from '../DTOs/CreateUserDto';
import { AppError } from '../AppError';
import { error } from 'console';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


export class UserUseCase { 
  private readonly repository : Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User); 
  }

  async execute({ firstName, lastName, email }: CreateUserDto) : Promise<User> {
   try {

    const userDto = plainToClass(CreateUserDto, { firstName, lastName, email });
    const errors = await validate(userDto);
    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {}).join(', ')).join('; ');
      throw new AppError(`Validation failed: ${messages}`, 400);
    }

    const user = new User(firstName, lastName, email);    
    return await this.repository.save(user);
   } catch (error) {
    if(error instanceof AppError) throw error;

    throw new AppError('Unexpected server error to create a new user', 500);
   }
  }
}