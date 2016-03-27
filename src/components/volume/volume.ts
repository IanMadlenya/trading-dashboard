import {Component, Input, ComponentRef, EventEmitter, Output} from 'angular2/core';
import {StockInformationService} from '../../core/stock-information.service';
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {JSONP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Rx';



@Component({
    selector: 'my-volume',
    template: require('./volume.html'),
    directives: [CHART_DIRECTIVES],
    providers: [JSONP_PROVIDERS, StockInformationService]
})

export class VolumeComponent{
    // @Input() dataResponse: Array<StockData>;
    _ref: ComponentRef;
    options: Object;
    lowerIndex: Subject<boolean> = new Subject();

    constructor(private _stockInformationService: StockInformationService) {}

    removeComponent() {
        this.lowerIndex.next(true);
        this._ref.dispose();
    }

    requestData(symbol: string) {

      this._stockInformationService.getData(symbol)
        .subscribe(
          data => {
            // Format Data
            var parseData = []

            for (var i = 0; i < data.query.results.quote.length; i++) {
              var date = new Date(data.query.results.quote[i].Date).getTime();
              var volume = parseInt(data.query.results.quote[i].Volume);
              parseData.unshift([date, volume])
            }

            // Set Chart Options
            this.options = {
              title: {text: "Volume for " + data.query.results.quote[0].Symbol},
              chart: {
                alignTicks: false
              },
              rangeSelector: {
                selected: 1
              },
              series: [{
                type: 'column',
                name: 'AAPL',
                data: parseData
              }],
              legend: {
                enabled: false
              }
            }

            // this.selectChart.highcharts('StockChart', {
            //   title: {text: "Volume for " + data.query.results.quote[0].Symbol},
            //   chart: {
            //       alignTicks: false
            //   },
            //   rangeSelector: {
            //       selected: 1
            //   },
            //   series: [{
            //       type: 'column',
            //       name: 'AAPL',
            //       data: parseData
            //   }],
            //   legend: {
            //       enabled: false
            //   }
            // })

          },
          error => console.log("Error: " + error)
        )
  }  // requestData function end

}
