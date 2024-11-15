import { Repository } from 'typeorm';
import { Post } from '../entity/Post';
import { AppDataSource } from '../database';
import { CreatePostDto } from '../DTOs/CreatePostDto';


export class PostUseCase {
  private readonly repository: Repository<Post>;

  constructor() {
    this.repository = AppDataSource.getRepository(Post)
  }

  async execute({ description, title, userId } : CreatePostDto) : Promise<Post> {
    const post = new Post(title, description, userId);

    return await this.repository.save(post)
  }
}