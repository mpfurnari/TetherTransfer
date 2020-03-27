import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';



@Injectable()
export class HtmlProvider {


    constructor(private http: HTTP) {
    }


    private static httpBackEnd(funcstr, path, outputStr, succesfun, errorfun, callbackobj) {
        const xhttp = new XMLHttpRequest();
        xhttp.open(funcstr, path, true);
//        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.setRequestHeader('Access-Control-Allow-Origin' , '*');

        // tslint:disable-next-line:only-arrow-functions
        xhttp.onload = function(e) {
            console.log('HtmlProvider: html success');
            console.log(e);
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    console.log('HtmlProvider html response text: ' + xhttp.responseText);
                    succesfun.apply(callbackobj, [xhttp.responseText]);

                } else {
                    console.error('HtmlProvider html reponse error, status:' + xhttp.statusText + ' response: ' + xhttp.responseText);
                    errorfun.apply(callbackobj, [xhttp.responseText]);

                }
            }
        };
        // tslint:disable-next-line:only-arrow-functions
        xhttp.onerror = function(e) {
            console.log('HtmlProvider: onerror');
            console.log('HtmlProvider: error object' + e);
            console.error('HtmlProvider: status ' + xhttp.statusText);
            console.error('HtmlProvider: response ' + xhttp.responseText);
            errorfun.apply(callbackobj, [xhttp.statusText]);

        };
        console.log('HtmlProvider: about to send. Function: ' + funcstr + ' url: ' + path + ' params: ' + outputStr);
        xhttp.send(outputStr);
    }




    static httpBackEndPromise(funcstr, path, outputStr) {
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        return new Promise(function(resolve, reject) {
            const xhttp = new XMLHttpRequest();
            xhttp.open(funcstr, path, true);
            xhttp.setRequestHeader('Content-type', 'application/json');

            // tslint:disable-next-line:only-arrow-functions
            xhttp.onload = function(e) {
                console.log('HtmlProvider: html success');
                console.log(e);
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        console.log('HtmlProvider html response text: ' + xhttp.responseText);
                        resolve(xhttp.responseText);
                    } else {
                        console.error('HtmlProvider html reponse error, status:' + xhttp.statusText + ' response: ' + xhttp.responseText);
                        reject(xhttp.responseText);
                    }
                }
            };
            // tslint:disable-next-line:only-arrow-functions
            xhttp.onerror = function(error) {
                console.log('HtmlProvider: onerror');
                console.log('HtmlProvider: error object' + error);
                console.error('HtmlProvider: status ' + xhttp.statusText);
                console.error('HtmlProvider: response ' + xhttp.responseText);
                reject(error);

            };
            console.log('HtmlProvider: about to send. Function: ' + funcstr + ' url: ' + path + ' params: ' + outputStr);
            xhttp.send(outputStr);
        });

    }

    private static getFromBackend(path, succesfun, errorfun, callbackobj) {
        this.httpBackEnd('GET', path, '', succesfun, errorfun, callbackobj);
    }

    private static postToBackend(path, postString, succesfun, errorfun, callbackobj) {
        this.httpBackEnd('POST', path, postString, succesfun, errorfun, callbackobj);
    }

    private static putToBackend(path, postString, succesfun, errorfun, callbackobj) {
        this.httpBackEnd('PUT', path, postString, succesfun, errorfun, callbackobj);
    }

}
