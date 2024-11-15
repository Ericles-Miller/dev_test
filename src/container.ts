import { Container } from 'inversify';
import { UserUseCase } from './UseCase/UserUseCase';
import { PostUseCase } from './UseCase/PostUseCase';


export const container = new Container();

container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<PostUseCase>(PostUseCase).toSelf();
