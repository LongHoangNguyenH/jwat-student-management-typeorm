import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CLASS_NAME_UNVALID, STUDENT_NAME_INVALID } from 'src/common/errors/constants.errors';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
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
