import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findPokemons(
    name: string,
    ope: string,
    baseExperience: number
  ): Promise<PokemonEntity[]> {
    let queryBuilder = this.pokemonRepository.createQueryBuilder("pokemon");

    if (name) {
      queryBuilder = queryBuilder.where(
        "LOWER(pokemon.name) LIKE LOWER(:name)",
        { name: `%${name}%` }
      );
    }

    if (ope && ["gt", "lt", "ge", "le", "eq"].includes(ope)) {
      switch (ope) {
        case "gt":
          queryBuilder = queryBuilder.andWhere(
            "pokemon.baseExperience > :baseExperience",
            { baseExperience }
          );
          break;
        case "lt":
          queryBuilder = queryBuilder.andWhere(
            "pokemon.baseExperience < :baseExperience",
            { baseExperience }
          );
          break;
        case "ge":
          queryBuilder = queryBuilder.andWhere(
            "pokemon.baseExperience >= :baseExperience",
            { baseExperience }
          );
          break;
        case "le":
          queryBuilder = queryBuilder.andWhere(
            "pokemon.baseExperience <= :baseExperience",
            { baseExperience }
          );
          break;
        case "eq":
          queryBuilder = queryBuilder.andWhere(
            "pokemon.baseExperience = :baseExperience",
            { baseExperience }
          );
          break;
      }
    }

    const results = await queryBuilder.getMany();

    if (results.length === 0) {
      throw new NotFoundException("No se encontraron resultados");
    }

    return results;
  }

  // Inyeccción a la base de datos, repositorio de información de pokemones, "funciona como semilla de llenado de datos"
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
