import { Order } from 'src/modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sale_agents', { schema: 'public' })
export class SaleAgent {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'password', nullable: false })
  password: string;
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
  @OneToMany(
    () => Order,
    (order) => {
      order.saleAgent;
    },
  )
  order: Order[];
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
