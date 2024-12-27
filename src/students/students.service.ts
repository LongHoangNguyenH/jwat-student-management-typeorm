import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/students.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { v4 as uuid } from 'uuid';
import { UpdateStudentDto } from './dto/update-student.dto';
import { STUDENT_EXISTS, STUDENT_NOT_FOUND } from 'src/common/errors/constants.errors';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly datasource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const existStudent = await this.studentRepository.findOne({
      where: { studentName: createStudentDto.studentName.toLowerCase() },
    });
    if (existStudent) {
      throw new HttpException(STUDENT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const newStudent = new StudentEntity(uuid(), createStudentDto.studentName.toLowerCase(), createStudentDto.classId);
    return this.studentRepository.save(newStudent);
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({
      where: { id },
    });
  }

  async findAll() {
    return await this.studentRepository.find();
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
    const currentStudent = await this.studentRepository.findOne({ where: { id: updateStudentDto.id } });
    if (!currentStudent) throw new HttpException(STUDENT_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (updateStudentDto?.classId) {
      updateStudentDto.classId = currentStudent.classId;
    } else if (updateStudentDto?.studentName) {
      updateStudentDto.studentName = updateStudentDto.studentName;
    }
    return this.studentRepository.update(updateStudentDto, updateStudentDto);
  }

  async remove(id: string) {
    const deleteStudent = await this.studentRepository.findOne({
      where: { id: id },
    });
    if (!deleteStudent) throw new HttpException(STUDENT_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.studentRepository.remove(deleteStudent);
  }
}
