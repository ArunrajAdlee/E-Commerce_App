import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {Listings} from './listings.entity';

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

    @OneToOne(type => Listings)
    @JoinColumn({ name: 'listing_id', referencedColumnName: 'id' })
    listing: Listings;
}
