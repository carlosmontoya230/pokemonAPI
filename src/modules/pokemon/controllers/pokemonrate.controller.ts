import { Body, Controller, Post } from "@nestjs/common";
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

  // @Post("rate")
  // async ratePokemon(
  //   @Body() ratePokemonDto: RatePokemonDto,
  //   @Res() resp: Response
  // ) {
  //   try {
  //     const { id, puntuation } = ratePokemonDto;
  //     await this.pokemonService.ratePokemon(id, puntuation);
  //     resp
  //       .status(HttpStatus.CREATED)
  //       .json({ message: "Pokemon rated successfully" });
  //   } catch (error) {
  //     resp
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ message: "Internal server error", error });
  //   }
  // }

  // @Get("top")
  // async getTopPokemon(@Query() query: TopPokemonDto, @Res() resp: Response) {
  //   try {
  //     const topPokemon = await this.pokemonService.getTopPokemon(query.top);
  //     resp.status(HttpStatus.OK).json(topPokemon);
  //   } catch (error) {
  //     resp
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ message: "Internal server error", status: false, error });
  //   }
  // }
}
