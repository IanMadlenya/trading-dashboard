import {Component, DynamicComponentLoader, ElementRef, ComponentRef} from "angular2/core";
import './app-shell.scss';
import {VolumeComponent} from '../../components/volume/volume';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [VolumeComponent]
})
export class AppShell {
    // response: Observable<Array<StockData>> = <StockData>[];

    // private _children:ComponentRef[] = [];



}
