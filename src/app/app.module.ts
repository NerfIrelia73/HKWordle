import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatChipsModule } from '@angular/material/chips'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas, faQuestionCircle, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { InstructionsComponent } from './modals/instructions/instructions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameComponent } from './game/game.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchService } from './search.service';
import { EndScreenComponent } from './modals/end-screen/end-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    InstructionsComponent,
    GameComponent,
    SearchBarComponent,
    EndScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'game', component: GameComponent},
    ]),
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faArrowDown, faArrowUp, faQuestionCircle);
  }
}
