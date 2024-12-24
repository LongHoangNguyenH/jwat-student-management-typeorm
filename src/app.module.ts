import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), StudentsModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
