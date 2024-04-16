import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PokemonRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number;

  @Column()
  puntuation: number;
}
