import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RatePokemonDto } from "../dtos/RatePokemonDto";
import { PokemonRating } from "../entities/rating.entity";

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(PokemonRating)
    private pokemonRatingRepository: Repository<PokemonRating>
  ) {}

  async ratePokemon(ratePokemonDto: RatePokemonDto): Promise<any> {
    try {
      const { id, puntuation } = ratePokemonDto;

      const pokemonRating = this.pokemonRatingRepository.create({
        pokemonId: id,
        puntuation
      });

      await this.pokemonRatingRepository.save(pokemonRating);

      return { message: "¡Calificación del Pokémon guardada con éxito!" };
    } catch (error) {
      throw new Error("Error al guardar la calificación del Pokémon");
    }
  }

  async getTopPokemon(top: number): Promise<PokemonRating[]> {
    return await this.pokemonRatingRepository.find({
      order: { puntuation: "DESC" },
      take: top
    });
  }
}
