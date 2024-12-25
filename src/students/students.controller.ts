import { Body, Controller, Delete, Get, Post, Put, Query, UseFilters } from '@nestjs/common';
import { StudentsService } from './students.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
@UseFilters(HttpExceptionFilter)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('/byId')
  findOne(@Body('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Get('/all')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/byClassname')
  findByClassname(@Query('searchClassName') className: string) {
    return this.studentsService.findByClassname(className);
  }

  @Get('/byStname')
  findByStudentname(@Query('searchStname') studentName: string) {
    return this.studentsService.findByStudentname(studentName);
  }

  @Put('/update')
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(updateStudentDto);
  }

  @Delete('/delete')
  remove(@Body('id') id: string) {
    return this.studentsService.remove(id);
  }
}
