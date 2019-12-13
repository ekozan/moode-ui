import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../moodeservice/library.service';
import { MusicFile } from '../moodeservice/musicfile';

import { VIEW_STYLE } from './view-style.enum';
import { VIEW_TYPE } from './view-type.enum';
import { Item } from './explorer-item';
import { Observable, fromEvent, of } from 'rxjs';



@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  providers: [ LibraryService ]

})
export class ExplorerComponent implements OnInit {

  viewstyle: VIEW_STYLE=VIEW_STYLE.GRID;
  VIEW_STYLE= VIEW_STYLE;
  tracks: Observable<MusicFile[]>;

  constructor(private ls: LibraryService) {}

  ngOnInit() {
     this.tracks = this.ls.tracks;

     this.tracks.subscribe(data => {
       console.log(data);
     })
  }



}
