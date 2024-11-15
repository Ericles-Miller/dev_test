import { Response, Request } from 'express';
import { container } from '../container';
import { PostUseCase } from '../UseCase/PostUseCase';

export class PostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title , description, userId } = request.body;

    const postUseCase = container.get(PostUseCase);

    const post = await postUseCase.execute({title, description, userId});

    return response.status(201).json(post);
  }
}