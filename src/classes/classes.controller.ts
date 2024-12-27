import { Body, Controller, Delete, Get, ParseUUIDPipe, Post, Put, UseFilters } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { UpdateClassDto } from './dto/update-class.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ADMIN, PRINCIPAL, TEACHER } from 'src/common/guards/role';

@Controller('classes')
@UseFilters(HttpExceptionFilter)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @Roles(ADMIN, PRINCIPAL)
  create(@Body(ParseUUIDPipe) createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get('/byId')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findOne(@Body('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Get('/all')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findAll() {
    return this.classesService.findAll();
  }

  @Put('/update')
  @Roles(ADMIN, PRINCIPAL)
  update(@Body() updateInfor: UpdateClassDto) {
    return this.classesService.update(updateInfor);
  }

  @Delete('/delete')
  @Roles(ADMIN, PRINCIPAL)
  remove(@Body('id') id: string) {
    return this.classesService.remove(id);
  }
}
