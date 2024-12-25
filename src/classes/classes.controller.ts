import { Body, Controller, Delete, Get, Post, Put, UseFilters } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { UpdateClassDto } from './dto/update-class.dto';

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

  @Put('/update')
  update(@Body() updateInfor: UpdateClassDto) {
    return this.classesService.update(updateInfor);
  }

  @Delete('/delete')
  remove(@Body('id') id: string) {
    return this.classesService.remove(id);
  }
}
