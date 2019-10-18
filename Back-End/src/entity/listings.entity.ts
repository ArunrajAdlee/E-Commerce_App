import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Listings {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	productName: string;

	@Column()
	quantity: number;
}
