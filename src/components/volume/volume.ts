import {Component, Input} from 'angular2/core';
import {StockData} from '../../core/data';

@Component({
    selector: 'my-volume',
    template: require('./volume.html')

})

export class VolumeComponent {
    @Input () dataResponse: Array<StockData>;
}


