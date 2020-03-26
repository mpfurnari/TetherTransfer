import { Component } from '@angular/core';

declare var JustGage: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  gaugevar;
  intervalTmr;

  constructor() {
    this.gaugevar = null;
  }

  gauge() {

    if (this.gaugevar == null) {

      this.gaugevar = new JustGage({
        id: 'gauge', // the id of the html element
        value: 50,
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 0.6
      });
    }
    // update the value randomly
    clearTimeout(this.intervalTmr);
    this.intervalTmr = setInterval(() => {
      this.gaugevar.refresh(Math.random() * 100);
    }, 5000);

  }

  ionViewDidEnter() {
    this.gauge();
  }

  ionViewDidLeave() {
    clearTimeout(this.intervalTmr);
  }

}
