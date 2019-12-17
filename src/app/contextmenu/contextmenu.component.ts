import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActionService } from '../action-service/action-service.service';
import { ACTIONS } from '../action-service/actions.enum';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit,OnDestroy {

  private sub: Subscription;
  private open: boolean = false;
  constructor(private actionService: ActionService) { }

  ngOnInit() {
    this.sub = this.actionService.action.subscribe(
      data=>{
        if(data.type == ACTIONS.OPEN_CONTEXMENU){
          this.openMenu(data.context,{x:data.rawEvent.x,y:data.rawEvent.y},data.item)
        }else{
          //todo close menu on click outside :) (context != contextmenu)
          /// add  this.obs = Observable.fromEvent(document, 'click'); on some part of the app
          /// or @HostListener('document:click') here
          if(open){
            this.closeMenu();
          }
        }
      }
    )
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openMenu(id:string,xy:{x:number,y:number},item){
    console.log(xy);
  }

  closeMenu(){

  }
}
