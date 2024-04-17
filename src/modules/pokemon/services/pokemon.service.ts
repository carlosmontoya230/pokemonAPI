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

  async findOne(name: string): Promise<any> {
    try {
      const pokemonInfo = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
          map((res: AxiosResponse<any, any>) => {
            const modifiedData = {
              id: res.data.id,
              name: res.data.forms[0].name,
              Info_Extra: res.data.forms[0].url,
              base_experience: res.data.base_experience
            };
            return modifiedData;
          }),

          catchError((err) => {
            throw err.response.data;
          })
        )
      );
      return pokemonInfo;
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
}
