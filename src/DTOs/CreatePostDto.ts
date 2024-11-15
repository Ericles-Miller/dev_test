import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  userId!: number
}