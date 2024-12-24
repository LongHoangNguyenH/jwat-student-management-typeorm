import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  className: string;
}
