import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PokemonController } from "./controllers/pokemon.controller";
import { PokemonRating } from "./entities/rating.entity";
import { PokemonsService } from "./services/pokemon.service";
import { RatingService } from "./services/rating.service";
import { PokemonRateController } from "./controllers/pokemonrate.controller";
import { PokemonEntity } from "./entities/pokemon.entity";
import { PokemonSearchService } from "./services/pokemonsearch.service";
import { PokemonSearchController } from "./controllers/pokemonsearch.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    TypeOrmModule.forFeature([PokemonRating, PokemonEntity])
  ],
  controllers: [
    PokemonController,
    PokemonRateController,
    PokemonSearchController
  ],
  providers: [PokemonsService, RatingService, PokemonSearchService]
})
export class PokemonModule {}
