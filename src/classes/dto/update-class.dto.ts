import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClassDto {
  @IsString()
  @IsOptional()
  @MaxLength(9)
  className: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
