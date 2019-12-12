import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../moodeservice/player.service';
import { Config } from '../app.config';

@Component({
  selector: 'app-backgroundmanager',
  templateUrl: './backgroundmanager.component.html',
  styleUrls: ['./backgroundmanager.component.scss']
})
export class BackgroundmanagerComponent implements OnInit {

  imageURL: string="";

  constructor(private ps: PlayerService) {
    ps.event.subscribe(data => {
      this.imageURL = Config.MoodeURL+data.coverurl;
    })
  }
  ngOnInit() {
  }

}
