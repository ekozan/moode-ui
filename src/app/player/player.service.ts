import { Injectable, Output, EventEmitter   } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private engineApiURL: string = "http://volumio.home/engine-mpd.php";
  private cmdApiURL: string = "http://volumio.home/command/";

  public state: State = new State();

  @Output()
   public event: EventEmitter<State> = new EventEmitter();


  constructor(private _httpClient: HttpClient) {
    this.state.state = "undef";
    this.StateApiCall();

  }

  private StateApiCall(){
    let params = new HttpParams()
      .set('state', this.state.state);

    this._httpClient.get<State>(`${this.engineApiURL}`,{ params: params }).subscribe(
      data => {
          this.state = data;
          //this.handleSetTimeOutEvent();
          this.event.emit(this.state);
          this.StateApiCall();
      }
    );
  }


  private sendCmd(cmd: string){
    let params = new HttpParams()
      .set('cmd', cmd);

    this._httpClient.get(`${this.cmdApiURL}`,{ params: params }).subscribe(
      data => {
          console.log(data);
      }
    );
  }

  private handleSetTimeOutEvent(event: State){
    if(event == ""){

    }
  }

  public play() {
    this.sendCmd("play");
  }

  public pause() {
    this.sendCmd("pause 1");
  }

  public playPauseToggle(){
    if(this.state.state == "play"){
      this.pause();
    }else{
      this.play();
    }
  }

  public stop() {
    this.sendCmd("play");
  }

  public next() {
    this.sendCmd("next");
  }

  public previous() {
    this.sendCmd("previous");
  }

  public seek(time: number){
    this.sendCmd("seekcur "+time);
  }

  public randomToggle(){
    if(this.state.random == 0){
      this.sendCmd("random 1");
    }else{
      this.sendCmd("random 0");
    }
  }

  public repeatToggle(){
    if(this.state.repeat == 0){
      this.sendCmd("repeat 1");
    }else{
      this.sendCmd("repeat 0");
    }
  }

  public setVol(vol: number){
    this.sendCmd("setvol "+vol);
  }


}
