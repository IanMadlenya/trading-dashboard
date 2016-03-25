import {Injectable} from 'angular2/core';
import {Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StockInformationService {
  date: any;
  constructor(private _jsonp: Jsonp) {
    this.date = new Date();
  }

  getData (symbol: string) {
    let year = this.date.getFullYear();
    let month = this.date.getMonth() + 1;
    let day = this.date.getDate();

    console.log(month);

    let startDate: string = [year - 1, month, day].join("-");
    let endDate: string = [year, month, day].join("-");

    console.log(startDate);
    console.log(endDate);

    let apiRootYahoo = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22";

    // let apiRoot = "http://marketdata.websol.barchart.com/getHistory.json";

    // var params = new URLSearchParams();
    //   params.set('key', '2bdfab4812fc5de3327d3495356cf383');
    //   params.set('symbol', symbol); // the user's search value
    //   params.set('type', 'daily');
    //   params.set('startDate', '20150311000000');
    //   params.set('format', 'json');
    //   params.set('callback', 'JSONP_CALLBACK');
    //
    // return this._jsonp
    //            .get(apiRoot, { search: params })
    //            .map(request => request.results.json());

    let fullURL = apiRootYahoo + symbol + "%22%20and%20startDate%20%3D%20%22" + startDate + "%22%20and%20endDate%20%3D%20%22" + endDate + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSONP_CALLBACK";

    console.log(fullURL)



    return this._jsonp
               .get(fullURL)
               .map(request => request.json());
  }
}
