import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Options } from 'ng5-slider';

import { PlayerService } from '../moodeservice/player.service';
import { State } from '../moodeservice/state';
import { Config } from '../app.config';


import { ResizeService } from '../size-detector/resize.service';
import { SCREEN_SIZE } from '../size-detector/screen-size.enum';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
   state: State;
   intervalsource = interval(500);

   options: Options = {
     floor: 0,
     ceil: 100,
     step: 0.1,
     showSelectionBar: true,
     hideLimitLabels:true,
     hidePointerLabels:true
   };
  value: number = 0;

  size: SCREEN_SIZE;
  SCREEN_SIZE= SCREEN_SIZE;

  moodeURL: string = Config.MoodeURL;

  constructor(private ps: PlayerService, private rs: ResizeService) {

    this.rs.onResize$
     .pipe(delay(0))
     .subscribe(size => {
       this.size = size;
     });

    this.state = ps.state;

    ps.event.subscribe(data => {
      this.state = data;
      this.value = this.state.elapsed*100/this.state.time;
    })

    this.intervalsource.subscribe(data => {
        this.renderTimeBar();
    });
  }

  ngOnInit() {
  }

  openPlayer(event){

  }

  onUserTimeBarChange(event){
    let newTime = this.state.time*event.value/100;
    this.ps.seek(newTime);
  }

  onClickTogglePlayPause(){
      this.ps.playPauseToggle();
  }


  private renderTimeBar(){
      if(this.state.state == "play"){
        if(this.value <= 100){
          this.value += (100/this.state.time)/2;
        }
      }
  }
}
