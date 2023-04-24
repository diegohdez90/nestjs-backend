import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(24)
  @MinLength(6)
  username: string;
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Your password is weak',
  })
  password: string;
}
