import { Anime } from "../models";

export interface AnimeUseCase {
  load(animeId: string): Anime
  load(page: number): Array<Anime>
  search(name: string, category: string, age: number, page: number, size: number, orderBy: number): Array<Anime>
}