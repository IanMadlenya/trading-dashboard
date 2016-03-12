import {Component, OnInit} from "angular2/core";
import {CardComponent} from "../../components/card/card";
import './app-shell.scss';
import {StockData} from '../../core/data.ts';
import {VolumeComponent} from '../../components/volume/volume';
import {StockInformationService} from '../../core/stock-information.service';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [CardComponent, VolumeComponent],
    providers: [StockInformationService]
})
export class AppShell implements OnInit {
    response: Array<StockData> = [];

    constructor(private _stockInformationService: StockInformationService) {}
    ngOnInit() {

        this._stockInformationService.getData()
            .subscribe(
                data => {
                    // console.log(data.query.results.quote);

                    for (var i=0; i < data.query.results.quote.length; i++) {
                        this.response.push(
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
                        )
                    }

                    // this.response = JSON.stringify(data.query.results.quote);
                },
                error => console.log("Error: " + error)
            )
    }



}



