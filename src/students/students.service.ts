import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { v4 as uuid } from 'uuid';
import { UpdateStudentDto } from './dto/update-student.dto';

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
    return this.studentRepository.findOne({
      where: { id },
    });
  }

  findAll() {
    return this.studentRepository.find();
  }

  async update(updateStudentDto: UpdateStudentDto) {
    const currentStudent = await this.studentRepository.findOne({
      where: { id: updateStudentDto.id },
    });
    console.log(currentStudent);
    return this.studentRepository.update(currentStudent, updateStudentDto);
  }

  async remove(id: string) {
    const deleteStudent = await this.studentRepository.findOne({
      where: { id: id },
    });
    return this.studentRepository.remove(deleteStudent);
  }
}
