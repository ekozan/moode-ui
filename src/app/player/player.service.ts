import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private engineApiURL: string = "http://volumio.home/engine-mpd.php";
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
          this.handleSetTimeOutEvent();
          console.log(this.state);
          this.event.emit(this.state);
          this.StateApiCall();
      }
    );
  }

  private handleSetTimeOutEvent(event){
    if(event == ""){

    }
  }


  public play() {
    //this.change.emit({action:"play"});
  }


}
