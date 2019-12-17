import { Injectable, Output, EventEmitter   } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { State } from './state';
import { Config } from '../app.config';
import { ActionService } from '../action-service/action-service.service';
import { Action } from '../action-service/action';
import { ACTIONS } from '../action-service/actions.enum';
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private engineApiURL: string = Config.MoodeURL+"/engine-mpd.php";
  private cmdApiURL: string = Config.MoodeURL+"/command/";
  private asSub: Subscription;
  public state: State = new State();

  @Output()
   public event: EventEmitter<State> = new EventEmitter();


  constructor(private _httpClient: HttpClient, private actionService: ActionService) {
    this.state.state = "undef";
    this.StateApiCall();
    this.asSub = actionService.action.subscribe(action => this.handleAction(action));
  }

  private handleAction(action: Action){
    if(action.type == ACTIONS.CLEAN_AND_ADD_TO_PLAYLIST){
      let paths: string[];
      if(action.item.type == "track"){
        paths = [ action.item.file ];
      }
      this.sendPostCmd("clrplayall",paths);
    }
    if(action.type == ACTIONS.ADD_TO_PLAYLIST_NEXT){

    }
  }

  private StateApiCall(){
    let params = new HttpParams()
      .set('state', this.state.state);

    this._httpClient.get<State>(`${this.engineApiURL}`,{ params: params }).subscribe(
      data => {
          this.state = data;
          //this.handleSetTimeOutEvent();
          this.event.emit(this.state);
          console.log(this.state);
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

  private sendPostCmd(cmd: string, options: any){
    let params = new HttpParams()
      .set('cmd', cmd);


    let postParms = new HttpParams();

    options.forEach((path) =>{
      postParms = postParms.append(`path[]`, path.replace(/ /g, '+'));
    })

    this._httpClient.post(`${this.cmdApiURL}`,postParms,{ params: params }).subscribe(
      data => {
          console.log(data);
      }
    );
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
    if(this.state.repeat === 0){
      this.sendCmd("repeat 1");
    }else{
      this.sendCmd("repeat 0");
    }
  }

  public setVol(vol: number){
    this.sendCmd("setvol "+vol);
  }


}
