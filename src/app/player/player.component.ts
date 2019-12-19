import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query,animateChild } from '@angular/animations';
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
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
       transition(':enter, :leave', [
         query('@*', animateChild())
       ])
     ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('400ms ease-in-out')),
    ]),
    trigger('slideDock', [
      state('hide', style({
        //transform: 'translate3d(0, 0, 0)'
        height:0
      })),
      state('minimize', style({
        //transform: 'translate3d(100%, 0, 0)'
        height:'100px'
      })),
      state('open', style({
        //transform: 'translate3d(100%, 0, 0)'
        height:'100%'
      })),
      transition('hide => minimize', animate('400ms ease-in-out')),
      transition('minimize => hide', animate('400ms ease-in-out')),
      transition('minimize => open', animate('400ms ease-in-out')),
      transition('open => minimize', animate('400ms ease-in-out'))
    ]),
  ]
})
export class PlayerComponent implements OnInit {
   state: State;
   intervalsource = interval(500);
   playerState: string = 'minimize';

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

  toggleHidePlayer(){
    if (this.playerState != 'open'){
      this.playerState = this.playerState === 'minimize' ? 'hide' : 'minimize';
    }
  }

  toggleOpenPlayer(){
    this.playerState = this.playerState === 'minimize' ? 'open' : 'minimize';
  }

  private renderTimeBar(){
      if(this.state.state == "play"){
        if(this.value <= 100){
          this.value += (100/this.state.time)/2;
        }
      }
  }
}
