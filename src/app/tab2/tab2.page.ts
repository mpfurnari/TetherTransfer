import { Component } from '@angular/core';

declare var JustGage: any;



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  inetgauge;
  gwgauge;
  intervalTmr;


  constructor() {
    this.inetgauge = null;
  }

  gauge() {

    if (this.inetgauge == null) {

      this.inetgauge = new JustGage({
        id: 'inetgauge', // the id of the html element
        value: 50,
        min: 0,
        max: 1000,
        decimals: 2,
        gaugeWidthScale: 0.6
      });
      this.gwgauge = new JustGage({
        id: 'gwgauge', // the id of the html element
        value: 25,
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 0.6
      });
    }
    // update the value randomly
    clearTimeout(this.intervalTmr);
    this.intervalTmr = setInterval(() => {
      this.inetgauge.refresh(Math.random() * 1000);
      this.gwgauge.refresh(Math.random() * 100);
    }, 5000);

  }

  ionViewDidEnter() {
    this.gauge();
  }

  ionViewDidLeave() {
    clearTimeout(this.intervalTmr);
  }
}
