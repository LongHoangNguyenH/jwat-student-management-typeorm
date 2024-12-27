import { Body, Controller, Delete, Get, ParseUUIDPipe, Post, Put, Query, UseFilters } from '@nestjs/common';
import { StudentsService } from './students.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ADMIN, PRINCIPAL, TEACHER } from 'src/common/guards/role';

@Controller('students')
@UseFilters(HttpExceptionFilter)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(ADMIN, TEACHER)
  create(@Body(ParseUUIDPipe) createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('/byId')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findOne(@Body('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Get('/all')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/byClassname')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findByClassname(@Query('searchClassName') className: string) {
    return this.studentsService.findByClassname(className);
  }

  @Get('/byStname')
  @Roles(ADMIN, PRINCIPAL, TEACHER)
  findByStudentname(@Query('searchStname') studentName: string) {
    return this.studentsService.findByStudentname(studentName);
  }

  @Put('/update')
  @Roles(ADMIN, TEACHER)
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(updateStudentDto);
  }

  @Delete('/delete')
  @Roles(ADMIN, TEACHER)
  remove(@Body('id') id: string) {
    return this.studentsService.remove(id);
  }
}
