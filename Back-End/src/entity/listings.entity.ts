import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Listings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    stock_count: number;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({default: 0})
    quantity_sold: number;

    @Column()
    status: boolean;

    @Column()
    user_id: number;

    @Column()
    username: string;

    @Column()
    category: number;

    @Column()
    category_name: string;
}
