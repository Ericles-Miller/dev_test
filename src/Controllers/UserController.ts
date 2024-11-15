import { Request, Response } from 'express';
import { UserUseCase } from '../UseCase/UserUseCase';
import { container } from '../container';


export class UserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {firstName, lastName, email} = request.body;
    
    const userUseCase = container.get(UserUseCase);

    const user = await userUseCase.execute({firstName, lastName, email});

    return response.status(201).json(user);
  }
}