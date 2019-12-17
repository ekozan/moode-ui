import { Injectable, Output} from '@angular/core';
import { Subject,Subscription} from 'rxjs';
import { Action } from './action';
import { ACTIONS } from './actions.enum';

//// TODO: MAKE IT CONFIGURABLE :)
const ActionConfig = {
  "explorer" : {
    "click": ACTIONS.PLAY,
    "dblclick": ACTIONS.CLEAN_AND_ADD_TO_PLAYLIST,
    "contextmenu": ACTIONS.OPEN_CONTEXMENU
  }
}

@Injectable({
  providedIn: 'root'
})

export class ActionService {
  
  @Output()
   public action: Subject<Action> = new Subject();

  private preventClickAction: boolean = false;

  constructor() {}

  handleAction(event:any, context:string, item:any){

    switch(event.type){
      case "click":
        this.preventClickAction=false;
        setTimeout(()=>{
          if(this.preventClickAction==false){
            this.doAction("click",context,event,item);
          }
        },200);
        break;
      case "dblclick":
        this.preventClickAction = true;
        this.doAction("dblclick",context,event,item);
        break;
      case "contextmenu":
        event.preventDefault();
        this.doAction("contextmenu",context,event,item);
        break;


      case "touchstart":
        break;
      case "touchend":
        break;
      case "touchcancel":
        break;
      case "touchleave":
        break;
      case "touchmove":
        break;

      default:
        console.log("Error Unknow event");
        break;
    }
  }

  private doAction(etype:string,context:string,rawEvent:any,item:any) {
    if(ActionConfig[context][etype]){
      const action = new Action();
      action.type = ActionConfig[context][etype];
      action.context = context;
      action.rawEvent = rawEvent;
      action.item = item;
      this.action.next(action);
    }
  }
}
