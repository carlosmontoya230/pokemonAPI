import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { environmentDB } from "./environments/environmentBD";
import { PokemonEntity } from "./modules/pokemon/entities/pokemon.entity";
import { PokemonRating } from "./modules/pokemon/entities/rating.entity";
import { PokemonModule } from "./modules/pokemon/pokemon.module";

@Module({
  imports: [
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: environmentDB.HOST,
      port: environmentDB.PORT,
      username: environmentDB.USER_NAME,
      password: environmentDB.PASSWORD,
      database: environmentDB.DATABASE,
      entities: [PokemonRating, PokemonEntity],
      synchronize: true
    }),
    PokemonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
