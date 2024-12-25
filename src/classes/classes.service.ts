import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entity/class.entity';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClassDto } from './dto/update-class.dto';
import { CLASS_EXISTS, CLASS_EXISTS_STUDENT, CLASS_NOT_FOUND } from 'src/common/errors/constants.errors';
import { StudentEntity } from 'src/students/entity/students.entity';
@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classesRepository: Repository<ClassEntity>,
    private readonly datasource: DataSource,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const existClass = await this.classesRepository.findOne({
      where: { className: createClassDto.className.toLowerCase() },
    });
    if (existClass) {
      throw new HttpException(CLASS_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const newClass = new ClassEntity(uuidv4(), createClassDto.className.toLowerCase());
    return this.classesRepository.save(newClass);
  }

  async findOne(id: string) {
    return await this.classesRepository.find({
      where: { id },
    });
  }

  async findAll() {
    return await this.classesRepository.find();
  }

  async update(updateClassDto: UpdateClassDto) {
    const updateClass = await this.classesRepository.findOne({
      where: { id: updateClassDto.id },
    });
    if (!updateClass) throw new HttpException(CLASS_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!updateClassDto.className) updateClassDto.className = updateClassDto.className.toLowerCase();
    return this.classesRepository.update(updateClass, updateClassDto);
  }

  async remove(id: string) {
    const deleteClass = await this.classesRepository.findOne({
      where: { id: id },
    });
    if (!deleteClass) {
      throw new HttpException(CLASS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const studentsLengthInClass = await this.datasource
      .getRepository(StudentEntity)
      .createQueryBuilder('students')
      .where('students.classId = :id', { id: id })
      .getCount();
    if (studentsLengthInClass > 0) {
      throw new HttpException(CLASS_EXISTS_STUDENT, HttpStatus.BAD_REQUEST);
    }
    return this.classesRepository.remove(deleteClass);
  }
}
