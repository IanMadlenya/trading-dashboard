import {Component, Input} from "angular2/core";
@Component({
    selector: 'card',
    template: require('./card.html')
})
export class CardComponent {

    @Input()
    title:string;

    @Input()
    description:string;

    @Input()
    linkText:string;
    
    @Input()
    link:string;
}