import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('classes')
@UseFilters(HttpExceptionFilter)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get('/byId')
  findOne(@Body('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Get('/all')
  findAll() {
    return this.classesService.findAll();
  }
}
