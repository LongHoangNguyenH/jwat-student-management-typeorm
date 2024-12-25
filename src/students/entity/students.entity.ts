import { ClassEntity } from 'src/classes/entity/class.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  studentName: string;

  @Column()
  @ManyToOne(() => ClassEntity, classEntity => classEntity.id)
  classId: string;
}
