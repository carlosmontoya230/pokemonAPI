import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { environmentDB } from "src/environments/environmentBD";
import { environmentAPI } from "src/environments/environmentsAPI";

@Injectable()
export class PokemonsService {
  baseUrl = environmentAPI.URL_BASE;
  baseUrlLocal = environmentDB.LOCAL_HOST;

  constructor(private readonly httpService: HttpService) {}

  async findOne(name: string): Promise<AxiosResponse<any>> {
    try {
      const pokemonName = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name}`).pipe(
          map((res: AxiosResponse<any, any>) => {
            return {
              ...res.data
            };
          }),
          catchError((err) => {
            throw err.response.data;
          })
        )
      );
      return pokemonName;
    } catch (error) {
      throw error;
    }
  }

  async findAllPagination(
    offset?: number,
    limit?: number
  ): Promise<AxiosResponse<any>> {
    try {
      const listPokePage = await firstValueFrom(
        this.httpService
          .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
          .pipe(
            map((res: AxiosResponse<any, any>) => {
              const results = res.data.results.map((result: any) => {
                return {
                  ...result
                };
              });
              return {
                ...res.data,
                results
              };
            }),
            catchError((err) => {
              throw err.response.data;
            })
          )
      );
      return listPokePage;
    } catch (error) {
      throw error;
    }
  }

  //   async getTopPokemon(top: number): Promise<PokemonSearch[]> {
  // return await this.pokemonSearchRepository.find({
  //   order: { baseExperience: "DESC" },
  //   take: top
  // });
  //   }
}
