import { ClassEntity } from 'src/classes/entity/class.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentName: string;

  @Column()
  @ManyToOne(() => ClassEntity, classEntity => classEntity.id)
  classId: string;
}
