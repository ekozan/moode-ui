import { Component, OnInit,Input } from '@angular/core';
import { LibraryService } from '../moodeservice/library.service';
import { VIEW_STYLE } from './view-style.enum';
import { VIEW_TYPE } from './view-type.enum';
import { Item } from './explorer-item';
import {Md5} from 'ts-md5/dist/md5';
import { Config } from '../app.config';
import { MusicFile } from '../moodeservice/musicfile';


@Component({
  selector: 'app-explorer-item',
  templateUrl: './explorer-item.component.html',
  styleUrls: ['./explorer-item.component.scss'],

})
export class ExplorerItemComponent implements OnInit {
    @Input() item: any;
    @Input() viewstyle: VIEW_STYLE;

    private VIEW_STYLE = VIEW_STYLE

    ngOnInit(){

    }

    private getImg(file:string): string {
      let md5: string= Md5.hashStr(file.substring(0,file.lastIndexOf('/'))) as string;
      return Config.MoodeURL + '/imagesw/thmcache/' + encodeURIComponent(md5) + '.jpg';
    }

    private trackClick(event, item: MusicFile){
      console.log(event);
      console.log(item);
    }
}
