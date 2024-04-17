import { Controller, Get, Post, Query } from "@nestjs/common";
import { PokemonSearchService } from "../services/pokemonsearch.service";
import { PokemonEntity } from "../entities/pokemon.entity";

@Controller("search")
export class PokemonSearchController {
  constructor(private readonly searchService: PokemonSearchService) {}

  @Get()
  async findPokemons(
    @Query("name") name: string,
    @Query("ope") ope: string,
    @Query("base_experience") baseExperience: number
  ): Promise<PokemonEntity[]> {
    return await this.searchService.findPokemons(
      name || "",
      ope || "eq",
      baseExperience || 0
    );
  }

  // Controller para llenado de datos
  @Post("fill-pokemon-table")
  async fillPokemonTable() {
    await this.searchService.fillPokemonTable();
    return { message: "Pokémon table filled successfully" };
  }
}
