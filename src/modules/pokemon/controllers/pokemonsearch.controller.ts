import { Controller, Post } from "@nestjs/common";
import { PokemonSearchService } from "../services/pokemonsearch.service";

@Controller("seed")
export class PokemonSearchController {
  constructor(private readonly searchService: PokemonSearchService) {}

  @Post("fill-pokemon-table")
  async fillPokemonTable() {
    await this.searchService.fillPokemonTable();
    return { message: "Pokémon table filled successfully" };
  }
}
