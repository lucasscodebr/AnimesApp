import { Video } from "../models";

export interface VideoUseCase {
  load(videoId: string): Video
  load(episodeId: string): Array<Video>
}
