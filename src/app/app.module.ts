import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Ng5SliderModule } from 'ng5-slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryService } from './library/library.service';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlayerComponent } from './player/player.component';
import { RadioComponent } from './radio/radio.component';
import { ConfigpanelComponent } from './configpanel/configpanel.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { MenuComponent } from './menu/menu.component';
import { AlbumdetailsComponent } from './albumdetails/albumdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    PlayerComponent,
    RadioComponent,
    ConfigpanelComponent,
    ScreensaverComponent,
    MenuComponent,
    AlbumdetailsComponent
  ],
  imports: [
    Ng5SliderModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
