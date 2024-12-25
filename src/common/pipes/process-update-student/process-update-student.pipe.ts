import { Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    if (!value.studentName) value.studentName = currentStudent.studentName.toLowerCase();
    if (!value.classId) value.classId = currentStudent.classId;
    return { value, currentStudent };
  }
}
