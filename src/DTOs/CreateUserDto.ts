import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  @IsEmail()
  email!: string;
}