import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
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



  apiURL: string = Config.MoodeURL+'/command/moode.php?cmd=loadlib';
  library: MusicLibrary = new MusicLibrary();

  @Output()
   change: EventEmitter<any> = new EventEmitter();

  constructor(private _httpClient: HttpClient) {
    this.getLibrary()
  }

  onInit(){

  }

  public getLibrary(){
      this._httpClient.get<MusicFile[]>(`${this.apiURL}`).subscribe(
        data => {
          this.library.musics = data;


          this.library.musics.forEach(music => {
              //console.log(music);

              //if(music.artist != undefined && music.artist in this.library.artists == false){
              //  console.log(music.artist)
              //}
          });
          //proccess it :)


          console.log(this.library);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
  }

  public search(searchtxt: String): MusicFile[]{
    return this.library.musics;
  }


  public getGenres(){

  }

  public getArtists(){

  }

  public getAlbums(){

  }

  public getTracks(){

  }

}
