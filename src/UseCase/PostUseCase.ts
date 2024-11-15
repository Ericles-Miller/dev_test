import { Repository } from 'typeorm';
import { Post } from '../entity/Post';
import { AppDataSource } from '../database';
import { CreatePostDto } from '../DTOs/CreatePostDto';
import { User } from '../entity/User';
import { AppError } from '../AppError';
import { plainToClass } from 'class-transformer';


export class PostUseCase {
  private readonly postRepository: Repository<Post>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async execute({ description, title, userId } : CreatePostDto) : Promise<Post> {
    try {

      const userDto = plainToClass(CreatePostDto, { description, title, userId });
      if(userDto) throw new AppError('Invalid data.', 400);

      const userExists = await this.userRepository.findOne({where: {id: userId}});
      if(!userExists) throw new AppError('UserId does not exists', 404);
  
      const post = new Post(title, description, userId);
  
      return await this.postRepository.save(post);
    } catch(error) {
      if(error instanceof AppError) throw error;

      throw new AppError('Unexpected server erro to create a new post', 500);
    }
  }
}