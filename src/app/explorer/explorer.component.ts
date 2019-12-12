import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../moodeservice/library.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  providers: [ LibraryService ]

})
export class ExplorerComponent implements OnInit {

  constructor(private ls: LibraryService) {
  }

  ngOnInit() {
    //this.getLibrary()
  }

}
