import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { ShopPage } from '../shop/shop';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = ShopPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
