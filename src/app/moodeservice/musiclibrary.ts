import { Track } from './track';
import { Album } from './album';
import { Artist } from './artist';
import { Genre } from './genre';

export class MusicLibrary {
  musics: Track[];
  albums: {[index: string]: Album};
  artists: {[index: string]: Artist};
  genres: {[index: string]: Genre};
}
