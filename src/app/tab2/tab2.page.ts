import { Component } from '@angular/core';
import { HtmlProvider } from '../providers/HtmlProvider';
import { HTTP } from '@ionic-native/http/ngx';
import * as moment from 'moment';


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


  constructor(private http: HTTP) {
    this.inetgauge = null;
  }

  gauge() {

    if (this.inetgauge == null) {

      this.inetgauge = new JustGage({
        id: 'inetgauge', // the id of the html element
        value: 0,
        min: 0,
        max: 10,
        decimals: 2,
        gaugeWidthScale: 0.6
      });
      this.gwgauge = new JustGage({
        id: 'gwgauge', // the id of the html element
        value: 0,
        min: 0,
        max: 10,
        decimals: 2,
        gaugeWidthScale: 0.6
      });
    }
    // update the value randomly
    clearTimeout(this.intervalTmr);
    this.intervalTmr = setInterval(() => {
      this.pollinet();
    }, 500);

  }

  gwResp() {

  }

  inetResp() {

  }


  pollinet() {
    const that = this;
    const inetStart = new Date().getTime();
    this.http.get('https://www.wral.com', {}, {})
      .then(data => {
        const elapsedtime = new Date().getTime() - inetStart;
        const bytesrx = data.data.length;
        console.log (bytesrx + ' bytes in ' + elapsedtime + ' milliseconds.');
        const rate = bytesrx / elapsedtime * 0.01;
        console.log('inet rate: ' + rate);
        that.inetgauge.refresh(rate);
        that.pollgw();

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        that.inetgauge.refresh(0);
        that.pollgw();

      });
  }

  pollgw() {
    const that = this;
    const gwStart = new Date().getTime();
    this.http.get('http://192.168.43.195', {}, {})
      .then(data => {
        const elapsedtime = new Date().getTime() - gwStart;
        const bytesrx = data.data.length;
        console.log (bytesrx + ' bytes in ' + elapsedtime + ' milliseconds.');
        const rate = bytesrx / elapsedtime * 0.01;
        console.log('gw rate: ' + rate);
        that.gwgauge.refresh(rate);
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        that.gwgauge.refresh(0);

      });
  }

  ionViewDidEnter() {
    this.gauge();
  }

  ionViewDidLeave() {
    clearTimeout(this.intervalTmr);
  }
}
