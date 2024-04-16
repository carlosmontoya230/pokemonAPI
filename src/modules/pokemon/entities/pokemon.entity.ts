import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class PokemonSearch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  opeBaseExperience: string;

  @Column()
  baseExperience: number;

  @CreateDateColumn()
  createdAt: Date;
}
