import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  @Column('timestamp', {
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;
  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
