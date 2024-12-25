import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const newStudent = new StudentEntity(uuid(), createStudentDto.studentName, createStudentDto.classId);
    return this.studentRepository.save(newStudent);
  }

  findOne(id: string) {
    console.log('here');
    return this.studentRepository.findOne({
      where: { id },
    });
  }

  findAll() {
    return this.studentRepository.find();
  }
}
