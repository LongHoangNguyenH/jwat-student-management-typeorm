import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entity/class.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClassDto } from './dto/update-class.dto';
import { CLASS_EXISTS } from 'src/common/errors/constants.errors';
@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classesRepository: Repository<ClassEntity>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const existClass = this.classesRepository.findOne({ where: { className: createClassDto.className.toLowerCase() } });
    if (existClass) {
      throw new HttpException(CLASS_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const newClass = new ClassEntity(uuidv4(), createClassDto.className.toLowerCase());
    return this.classesRepository.save(newClass);
  }

  findOne(id: string) {
    return this.classesRepository.find({
      where: { id },
    });
  }

  findAll() {
    return this.classesRepository.find();
  }

  async update(updateInfor: UpdateClassDto) {
    const updateClass = await this.classesRepository.findOne({
      where: { id: updateInfor.id },
    });
    updateInfor.className = updateInfor.className.toLowerCase();
    return this.classesRepository.update(updateClass, updateInfor);
  }

  async remove(id: string) {
    const deleteClass = await this.classesRepository.findOne({
      where: { id: id },
    });
    return this.classesRepository.remove(deleteClass);
  }
}
