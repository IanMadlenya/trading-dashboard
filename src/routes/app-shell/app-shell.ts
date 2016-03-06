import {Component, OnInit} from "angular2/core";
import {CardComponent} from "../../components/card/card";
import './app-shell.scss';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [CardComponent]
})
export class AppShell implements OnInit {
    ngOnInit() {
    }

    constructor() {

    }
}