import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STUDENT_NOT_FOUND } from 'src/common/errors/constants.errors';
import { StudentEntity } from 'src/students/entity/students.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcessUpdateStudentPipe implements PipeTransform {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}
  async transform(value: { id: string; studentName: string; classId: string }) {
    const currentStudent = await this.studentRepository.findOne({
      where: { id: value.id },
    });
    if (!currentStudent) throw new HttpException(STUDENT_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!value.studentName) value.studentName = currentStudent.studentName.toLowerCase();
    if (!value.classId) value.classId = currentStudent.classId;
    return { value, currentStudent };
  }
}
