import { Order } from 'src/modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customers', { schema: 'public' })
export class Customer {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;
  @Column('character varying', { name: 'name', nullable: false })
  name: string;
  @Column('character varying', { name: 'mobile', nullable: false })
  mobile: string;
  @Column('character varying', { name: 'account_number', nullable: false })
  accountNumber: string;
  @Column('character varying', {
    name: 'address',
    nullable: false,
  })
  address: string;
  @Column('character varying', {
    name: 'identification_number',
    nullable: false,
  })
  identityNumber: string;
  @OneToOne(
    () => Order,
    (order) => {
      order.customer;
    },
  )
  order: Order;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
