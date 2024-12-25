import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  CLASS_NAME_REQUIRED,
  CLASS_NAME_UNVALID,
  STUDENT_NAME_INVALID,
  STUDENT_NAME_REQUIRED,
} from 'src/common/errors/constants.errors';

export class CreateStudentDto {
  @MaxLength(30)
  @IsString({ message: STUDENT_NAME_INVALID })
  @IsNotEmpty({ message: STUDENT_NAME_REQUIRED })
  public studentName: string;

  @IsNotEmpty({ message: CLASS_NAME_REQUIRED })
  @IsString({ message: CLASS_NAME_UNVALID })
  @MaxLength(9)
  public className: string;

  constructor(studentName: string, className: string) {
    this.studentName = studentName;
    this.className = className;
  }
}
