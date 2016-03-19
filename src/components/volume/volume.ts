import {Component, ComponentRef} from 'angular2/core';
import {ChartDirective} from './volume-charts.ts';

@Component({
    selector: 'my-volume',
    template: require('./volume.html'),
    directives: [ChartDirective]
})

export class VolumeComponent {
    _ref: ComponentRef;
    _data: Array<any>;
}

