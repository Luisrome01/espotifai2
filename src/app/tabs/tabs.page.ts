import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}


  onTabChange(event: any) {
    const selectedTab = event.detail.tab;
    if (selectedTab === 'tab4') {
      
    }
  }


}
