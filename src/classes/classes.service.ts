import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entity/class.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classesRepository: Repository<ClassEntity>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const newClass = new ClassEntity(uuidv4(), createClassDto.className);
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
}
