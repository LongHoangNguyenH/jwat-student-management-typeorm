import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthRoleGuard } from './common/guards/auth-role/auth-role.guard';
@Module({
  imports: [TypeOrmModule, ConfigModule.forRoot(), StudentsModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthRoleGuard }],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
