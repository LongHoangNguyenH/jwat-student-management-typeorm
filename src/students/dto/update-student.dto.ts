import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  CLASS_NAME_UNVALID,
  STUDENT_ID_INVALID,
  STUDENT_ID_REQUIRED,
  STUDENT_NAME_INVALID,
} from 'src/common/errors/constants.errors';

export class UpdateStudentDto {
  @IsNotEmpty({ message: STUDENT_ID_REQUIRED })
  @IsString({ message: STUDENT_ID_INVALID })
  public id: string;

  @MaxLength(30)
  @IsString({ message: STUDENT_NAME_INVALID })
  @IsOptional()
  public studentName?: string;

  @IsString({ message: CLASS_NAME_UNVALID })
  @IsOptional()
  public classId?: string;

  constructor(id: string, studentName: string, classId: string) {
    this.studentName = studentName;
    this.classId = classId;
    this.id = id;
  }
}
