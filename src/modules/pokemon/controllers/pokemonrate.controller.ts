import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RatePokemonDto } from "../dtos/RatePokemonDto";
import { RatingService } from "../services/rating.service";

@Controller("pokemons")
export class PokemonRateController {
  constructor(private readonly pokemonService: RatingService) {}

  @Post("rate")
  async ratePokemon(@Body() ratePokemonDto: RatePokemonDto): Promise<any> {
    try {
      return await this.pokemonService.ratePokemon(ratePokemonDto);
    } catch (error) {
      throw new Error("Error al calificar el Pokémon");
    }
  }

  @Get("ranking/top")
  async getTopPokemon(@Query("top") top: number) {
    try {
      const topPokemon = await this.pokemonService.getTopPokemon(top);
      return topPokemon;
    } catch (error) {
      throw new Error("Error al obtener los Pokémon mejor calificados");
    }
  }
}
