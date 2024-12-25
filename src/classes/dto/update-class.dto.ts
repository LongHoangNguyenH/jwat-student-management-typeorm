import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';
import { CLASS_ID_REQUIRED, CLASS_NAME_UNVALID } from 'src/common/errors/constants.errors';

export class UpdateClassDto {
  @IsString({ message: CLASS_NAME_UNVALID })
  @IsOptional()
  @MaxLength(9)
  className: string;

  @IsString({ message: CLASS_NAME_UNVALID })
  @IsNotEmpty({ message: CLASS_ID_REQUIRED })
  id: string;
}
