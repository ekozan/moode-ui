import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlayerComponent } from './player/player.component';
import { ConfigpanelComponent } from './configpanel/configpanel.component';


const routes: Routes = [
  { path: '', redirectTo: 'explorer', pathMatch: 'full' },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'explorer/:id', component: ExplorerComponent },
  { path: 'configpanel', component: ConfigpanelComponent },
  { path: '**', redirectTo: 'explorer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
