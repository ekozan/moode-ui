import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { LibraryService } from './library/library.service';

import { ExplorerComponent } from './explorer/explorer.component';
import { ExplorerItemComponent } from './explorer/explorer-item.component';

import { PlayerComponent } from './player/player.component';
import { RadioComponent } from './radio/radio.component';
import { ConfigpanelComponent } from './configpanel/configpanel.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { MenuComponent } from './menu/menu.component';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';
import { BackgroundmanagerComponent } from './backgroundmanager/backgroundmanager.component';
import { SizeDetectorComponent } from './size-detector/size-detector.component';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';


@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    ExplorerItemComponent,
    PlayerComponent,
    RadioComponent,
    ConfigpanelComponent,
    ScreensaverComponent,
    MenuComponent,
    AlbumdetailsComponent,
    BackgroundmanagerComponent,
    SizeDetectorComponent,
    ContextmenuComponent
  ],
  imports: [
    Ng5SliderModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
