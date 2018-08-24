import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SpeakersPage } from '../speakers/speakers';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SpeakersPage;
  tab3Root = ContactPage;
  tab4Root = AboutPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
