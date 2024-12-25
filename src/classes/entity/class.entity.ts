import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('classes')
export class ClassEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  className: string;

  constructor(id: string, className: string) {
    this.id = id;
    this.className = className;
  }
}
