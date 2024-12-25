import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/students.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { v4 as uuid } from 'uuid';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly datasource: DataSource,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const newStudent = new StudentEntity(uuid(), createStudentDto.studentName.toLowerCase(), createStudentDto.classId);
    return this.studentRepository.save(newStudent);
  }

  findOne(id: string) {
    return this.studentRepository.findOne({
      where: { id },
    });
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findByClassname(className: string) {
    return await this.datasource
      .getRepository(StudentEntity)
      .createQueryBuilder('students')
      .innerJoin('students.classId', 'student_with_classname')
      .where('student_with_classname.className = :className', { className: className })
      .getMany();
  }

  async findByStudentname(studentName: string) {
    return await this.datasource
      .getRepository(StudentEntity)
      .createQueryBuilder('students')
      .where('students.studentName LIKE :studentName', { studentName: `%${studentName.toLowerCase()}%` })
      .getMany();
  }

  async update(updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(updateStudentDto['currentStudent'], updateStudentDto['value']);
  }

  async remove(id: string) {
    const deleteStudent = await this.studentRepository.findOne({
      where: { id: id },
    });
    return this.studentRepository.remove(deleteStudent);
  }
}
