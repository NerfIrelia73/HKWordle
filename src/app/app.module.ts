import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatChipsModule } from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTabsModule } from '@angular/material/tabs'

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
import { CopiedComponent } from './modals/copied/copied.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKCxE3MBuibmYTMtFUvIxUc-qmx20VlVk",
  authDomain: "hunters-journle.firebaseapp.com",
  projectId: "hunters-journle",
  storageBucket: "hunters-journle.appspot.com",
  messagingSenderId: "944274708393",
  appId: "1:944274708393:web:4f4f3a8bbf07db159696b8",
  measurementId: "G-W3R4TBKSXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    InstructionsComponent,
    GameComponent,
    SearchBarComponent,
    EndScreenComponent,
    CopiedComponent,
    TopNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTabsModule,
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
