import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CLASS_NAME_MAX_LENGTH, CLASS_NAME_REQUIRED, CLASS_NAME_UNVALID } from 'src/common/errors/constants.errors';
export class CreateClassDto {
  @IsNotEmpty({ message: CLASS_NAME_REQUIRED })
  @IsString({ message: CLASS_NAME_UNVALID })
  @MaxLength(9, { message: CLASS_NAME_MAX_LENGTH })
  public className: string;

  constructor(className: string) {
    this.className = className;
  }

  public getName(): string {
    return this.className;
  }

  public setName(className: string) {
    this.className = className;
  }
}
