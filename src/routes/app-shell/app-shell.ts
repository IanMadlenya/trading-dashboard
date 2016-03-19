import {Component, DynamicComponentLoader, ElementRef, ComponentRef} from "angular2/core";
import './app-shell.scss';
import {StockData} from '../../core/data.ts';
import {VolumeComponent} from '../../components/volume/volume';
import {StockInformationService} from '../../core/stock-information.service';
import {ChartDirective} from '../../components/volume/volume-charts';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

import {CHART_DIRECTIVES} from 'angular2-highcharts';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [VolumeComponent, ChartDirective, CHART_DIRECTIVES],
    providers: [JSONP_PROVIDERS, StockInformationService]
})
export class AppShell {
    response: Observable<Array<StockData>> = <StockData>[];
    testResponse: {};
    private _children:ComponentRef[] = [];



    remove() {
        this._children.forEach(cmp => cmp.dispose());
        this._children = []; // not even necessary to get the components off the screen
    }

    options: Object;

    constructor(private _stockInformationService: StockInformationService,
                private _dcl: DynamicComponentLoader,
                private _er: ElementRef) {}



    requestData(symbol: string) {
        // clear old response
        this.response.length = 0;
        this.testResponse = {};

        this._stockInformationService.getData(symbol)
            .subscribe(
                data => {
                    console.log(data);

                    for (var i=0; i < data.query.results.quote.length; i++) {
                        this.response.unshift(
                            {
                                adj_close: data.query.results.quote[i].Adj_Close,
                                close: data.query.results.quote[i].Close,
                                date: data.query.results.quote[i].Date,
                                high: data.query.results.quote[i].High,
                                low: data.query.results.quote[i].Low,
                                open: data.query.results.quote[i].Open,
                                symbol: data.query.results.quote[i].Symbol,
                                volume: data.query.results.quote[i].Volume
                            }
                        );
                    }


                    // console.log(this.response.map(dayData => dayData.volume).splice(0, 7))
                    var dataLength = this.response.length
                    console.log(dataLength)

                    console.log(this.response.map(dayData => dayData.date).splice(dataLength - 20, dataLength - 1))

                    // Parse and test basic data
                    this.testResponse = {}
                    this.testResponse = {
                        labels: this.response.map(dayData => dayData.date).splice(dataLength - 20, dataLength - 1),
                        datasets: [
                            {
                                label: "Volume Dataset",
                                fillColor: "rgba(220,220,220,0.2)",
                                strokeColor: "rgba(220,220,220,1)",
                                pointColor: "rgba(220,220,220,1)",
                                pointStrokeColor: "#000",
                                pointHighlightFill: "#000",
                                pointHighlightStroke: "rgba(220,220,220,1)",
                                data: this.response.map(dayData => dayData.volume).splice(0, 20)
                            }
                        ]
                    }

                    this._dcl.loadIntoLocation(VolumeComponent, this._er, 'dynamicChart')
                        .then((ref: ComponentRef) => {
                            this.remove();

                            ref.instance._ref = ref;
                            ref.instance._data = this.testResponse;
                            
                            this._children.push(ref);
                        });
                },
                error => console.log("Error: " + error)
            )
        

    }  // requestData function end
}

