import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { AgendaPage } from '../agenda/agenda';
import { ShopPage } from '../shop/shop';
import { AboutPage } from '../about/about';

@IonicPage({name: 'TabsPage'})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = AgendaPage;
  tab4Root = ShopPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
