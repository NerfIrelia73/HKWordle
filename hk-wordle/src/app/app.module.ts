import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { InstructionsComponent } from './instructions/instructions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameComponent } from './game/game.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    InstructionsComponent,
    GameComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'game', component: GameComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
