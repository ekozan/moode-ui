import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        //width:0
        transform: 'translateX(-350px)'
      })),
      state('out', style({
        //width:300
        transform: 'translateX(0px)'
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
