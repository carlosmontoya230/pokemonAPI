import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PokemonEntity } from "../entities/pokemon.entity";
import { PokemonsService } from "./pokemon.service";

@Injectable()
export class PokemonSearchService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
    private readonly pokemonService: PokemonsService
  ) {}

  // Inyeccción a la base de datos, repositorio de información de pokemones
  async fillPokemonTable() {
    try {
      for (let i = 1; i <= 100; i++) {
        const pokemonData = await this.pokemonService.findOne(i.toString());

        const newPokemon = new PokemonEntity();
        newPokemon.name = pokemonData.name;
        newPokemon.baseExperience = pokemonData?.base_experience;
        newPokemon.createdAt = new Date();

        await this.pokemonRepository.save(newPokemon);
      }

      console.log("Tabla de Pokémon llena exitosamente");
    } catch (error) {
      console.error("Error al llenar la tabla de Pokémon:", error);
    }
  }
}
