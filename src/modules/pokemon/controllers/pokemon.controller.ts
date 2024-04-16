import { Controller, Get, HttpStatus, Param, Query, Res } from "@nestjs/common";
import { PokemonsService } from "../services/pokemon.service";
import { Response } from "express";

@Controller("pokemons")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonsService) {}

  // Get pokemon per name
  @Get(":name")
  async getOne(@Param("name") name: string, @Res() resp: Response) {
    try {
      const PokemonDetails = await this.pokemonService.findOne(name);
      resp.status(HttpStatus.ACCEPTED).json(PokemonDetails);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }

  @Get()
  async getAll(
    @Res() resp: Response,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number
  ) {
    try {
      const list = await this.pokemonService.findAllPagination(offset, limit);
      resp.status(HttpStatus.ACCEPTED).json(list);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }
}
