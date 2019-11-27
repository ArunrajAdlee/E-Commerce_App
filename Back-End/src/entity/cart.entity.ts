import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Cart {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    listing_id: number;

    @Column()
    user_id: number;

    @Column()
    quantity: number;

}