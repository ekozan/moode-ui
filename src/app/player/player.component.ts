import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { State } from './state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
   state: State;

  constructor(private ps: PlayerService) {
    this.state = ps.state;
    ps.event.subscribe(data => {
      this.state = data;
    })
  }

  ngOnInit() {
  }

  openPlayer(event){
    console.log("z");
    console.log(event);
  }


}
