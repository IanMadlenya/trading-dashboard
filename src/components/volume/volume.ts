import {Component, ComponentRef, ViewChild, AfterViewInit} from 'angular2/core';
import {ChartDirective} from './volume-charts.ts';

@Component({
    selector: 'my-volume',
    template: require('./volume.html'),
    directives: [ChartDirective]
})

export class VolumeComponent implements AfterViewInit {
    ngAfterViewInit():any {
        // return undefined;
    }

    _ref: ComponentRef;
    _data: Array<any>;

    @ViewChild('vol-chart');

    private canvas;

    //DIRECTIVES: CHART_DIRECTIVES
    // options: Object;
    // Template: <chart [options]="options"></chart>
    
    //Maybe use lifecycle hook to set data
}

