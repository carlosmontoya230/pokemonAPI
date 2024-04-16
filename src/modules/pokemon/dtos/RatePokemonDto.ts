import { IsNumber, Min, Max } from "class-validator";

export class RatePokemonDto {
  @IsNumber()
  id: number;

  // @IsNumber()
  // pokemonId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  puntuation: number;
}

export class TopPokemonDto {
  @IsNumber()
  top: number;
}
