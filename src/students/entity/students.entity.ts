import { ClassEntity } from 'src/classes/entity/class.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  studentName: string;

  @Column({ nullable: false })
  @ManyToOne(() => ClassEntity, classEntity => classEntity.id)
  classId: string;

  constructor(id: string, studentName: string, classId: string) {
    this.id = id;
    this.studentName = studentName;
    this.classId = classId;
  }
}
