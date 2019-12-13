import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


import { MusicFile } from './musicfile';
import { Album } from './album';
import { Artist } from './artist';
import { Genre } from './genre';
import { MusicLibrary } from './musiclibrary';
import { Config } from '../app.config';

@Injectable({
  providedIn: 'root'
})


export class LibraryService {
  private _tracks = new BehaviorSubject<MusicFile[]>([]);
  private apiURL: string = Config.MoodeURL+'/command/moode.php?cmd=loadlib';
  private dataStore: MusicLibrary = new MusicLibrary();

  readonly tracks = this._tracks.asObservable();

  @Output()
   change: EventEmitter<any> = new EventEmitter();




  constructor(private _httpClient: HttpClient) {
    this.loadLibrary();
  }

  public loadLibrary(){
      this._httpClient.get<MusicFile[]>(`${this.apiURL}`).subscribe(
        data => {
          this.dataStore.musics = data;
          this._tracks.next(Object.assign({}, this.dataStore).musics);

          this.dataStore.musics.forEach(music => {
          });
          console.log(this.dataStore);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
  }

  public search(searchtxt: String): MusicFile[]{
    return this.dataStore.musics;
  }

}
