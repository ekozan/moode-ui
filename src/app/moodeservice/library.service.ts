import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map,timeout} from 'rxjs/operators';

import { Track } from './track';
import { Album } from './album';
import { Artist } from './artist';
import { Genre } from './genre';
import { MusicLibrary } from './musiclibrary';
import { Config } from '../app.config';

@Injectable({
  providedIn: 'root'
})


export class LibraryService {
  private _tracks = new BehaviorSubject<Track[]>([]);
  private apiURL: string = Config.MoodeURL+'/command/moode.php?cmd=loadlib';
  private dataStore: MusicLibrary = new MusicLibrary();

  readonly tracks = this._tracks.asObservable();

  @Output()
   change: EventEmitter<any> = new EventEmitter();




  constructor(private _httpClient: HttpClient) {
    this.loadLibrary();
  }

  public loadLibrary(){
      this._httpClient.get<Track[]>(`${this.apiURL}`)
      .pipe(timeout(3000))
      .pipe(
         map((data: any[]) => data.map((item: any) => {
           const track = new Track();
           Object.assign(track, item);
           track.type = "track";
           return track;
         }))
      )
      .subscribe(
        data => {
          this.dataStore.musics = data;
          this._tracks.next(Object.assign({}, this.dataStore).musics);

          this.dataStore.musics.forEach(music => {
          });
          console.log(this.dataStore);
        },
        (error) => {
          console.log (error);
          this._tracks.next(Object.assign({}, this.dataStore).musics);
        }
      );
  }

  public search(searchtxt: String): Track[]{
    return this.dataStore.musics;
  }

}
