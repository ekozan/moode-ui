import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { State } from './state';
import { Options } from 'ng5-slider';

import { interval } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
   state: State;
   intervalsource = interval(1000);

   options: Options = {
     floor: 0,
     ceil: 100,
     step: 0.1,
     showSelectionBar: true,
     hideLimitLabels:true,
     hidePointerLabels:true
   };
  value: number = 0;

  constructor(private ps: PlayerService) {

    this.state = ps.state;

    ps.event.subscribe(data => {
      this.state = data;
      this.value = this.state.elapsed*100/this.state.duration;
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
        if(this.value < this.state.duration){
          this.value += 100/this.state.time;
        }
      }
  }
}
