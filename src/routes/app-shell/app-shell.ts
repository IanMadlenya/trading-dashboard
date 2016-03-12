import {Component, OnInit} from "angular2/core";
import {CardComponent} from "../../components/card/card";
import './app-shell.scss';
import {VolumeComponent} from '../../components/volume/volume';
import {StockInformationService} from '../../core/stock-information.service';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [CardComponent, VolumeComponent],
    providers: [StockInformationService]
})
export class AppShell implements OnInit {
    response: Array<any>;

    constructor(private _stockInformationService: StockInformationService) {}
    ngOnInit() {

        this._stockInformationService.getData()
            .subscribe(
                data => {
                    console.log(data.query.results.quote);
                    this.response = data.query.results.quote;

                    console.log(this.response[0]);

                    // this.response = JSON.stringify(data.query.results.quote);
                },
                error => console.log(error)
            )
    }






}



