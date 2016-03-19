import {Injectable} from 'angular2/core';
import {Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StockInformationService {
  constructor(private _jsonp: Jsonp) {}

  getData (symbol: string) {
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



    return this._jsonp
               .get(apiRootYahoo + symbol + "%22%20and%20startDate%20%3D%20%222015-03-21%22%20and%20endDate%20%3D%20%222016-03-16%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSONP_CALLBACK")
               .map(request => request.json());
  }
}
