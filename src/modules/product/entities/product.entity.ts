import { REGIONS } from 'src/common/constant';
import { Container } from 'src/modules/container/entities/container.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product_skus', schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  @Column('character varying', { name: 'name', nullable: false, length: 255 })
  name: string;
  @Column('character varying', {
    name: 'region',
    nullable: false,
    length: 255,
  })
  region: REGIONS;

  @OneToMany(() => Container, (container) => container.product)
  container: Container[];

  @CreateDateColumn({
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
