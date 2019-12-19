import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        //transform: 'translate3d(0, 0, 0)'
        width:0
      })),
      state('out', style({
        //transform: 'translate3d(100%, 0, 0)'
        width:250
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class MenuComponent implements OnInit {

  private menuState: string = 'in';

  constructor() { }

  ngOnInit() {}

  toggleMenu(){
    console.log("toggle");
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
