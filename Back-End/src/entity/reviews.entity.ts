import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Reviews {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    seller_id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;
  
    @Column({ nullable: true })
    rating: number;


}