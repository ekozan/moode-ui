import { MusicFile } from './musicfile';
import { Album } from './album';
import { Artist } from './artist';
import { Genre } from './genre';

export class MusicLibrary {
  musics: MusicFile[];
  albums: {[index: string]: Album};
  artists: {[index: string]: Artist};
  genres: {[index: string]: Genre};
}
