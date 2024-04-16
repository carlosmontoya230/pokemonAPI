import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PokemonController } from "./controllers/pokemon.controller";
import { PokemonRating } from "./entities/rating.entity";
import { PokemonsService } from "./services/pokemon.service";
import { RatingService } from "./services/rating.service";
import { PokemonRateController } from "./controllers/pokemonrate.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    TypeOrmModule.forFeature([PokemonRating])
  ],
  controllers: [PokemonController, PokemonRateController],
  providers: [PokemonsService, RatingService]
})
export class PokemonModule {}
