import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    
    @Column()
    listing_id: number;

    @Column()
    seller_id: number;

    @Column({ nullable: true })
    purchase_date: Date;

    @Column()
    quantity: number;

    @Column()
    price_before_tax: number;

    @Column()
    tax: number;

    @Column()
    price_after_tax: number;

    @Column()
    listing_fee: number;

    @OneToOne(type => Order)
    @JoinColumn([{ name: 'order_id', referencedColumnName: 'id'}])
    order: Order;
}