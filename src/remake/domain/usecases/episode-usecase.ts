import { Episode } from "../models";

export interface EpisodeUseCase {
  load(): Array<Episode>
  load(animeId: string): Array<Episode>
}
