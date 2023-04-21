import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateTaskDtp {
  @IsNotEmpty()
  @MinLength(12)
  title: string;
  @IsNotEmpty()
  @MinLength(50)
  description: string;
}
