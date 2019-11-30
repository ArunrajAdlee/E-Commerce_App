import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Ads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    click_count: number;
}
