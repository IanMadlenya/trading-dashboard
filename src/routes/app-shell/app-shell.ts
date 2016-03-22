import {Component, DynamicComponentLoader, ElementRef, ComponentRef} from "angular2/core";
import './app-shell.scss';
import {StockData} from '../../core/data.ts';
import {VolumeComponent} from '../../components/volume/volume';
import {StockInformationService} from '../../core/stock-information.service';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {CHART_DIRECTIVES} from 'angular2-highcharts';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [VolumeComponent, CHART_DIRECTIVES],
    providers: [JSONP_PROVIDERS, StockInformationService]
})
export class AppShell {
    // response: Observable<Array<StockData>> = <StockData>[];
    options: Object;
    // private _children:ComponentRef[] = [];


    constructor(private _stockInformationService: StockInformationService,
                private _dcl: DynamicComponentLoader,
                private _er: ElementRef) {}



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

                },
                error => console.log("Error: " + error)
            )
    }  // requestData function end
}
