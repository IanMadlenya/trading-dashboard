import {Component, DynamicComponentLoader, ElementRef, ComponentRef} from "angular2/core";
import './app-shell.scss';
import {VolumeComponent} from '../../components/volume/volume';

@Component({
    selector: 'app-shell',
    template: require('./app-shell.html'),
    directives: [VolumeComponent]
})
export class AppShell {
  limitComponent: number = 0;

  // private _children:ComponentRef[] = [];
  constructor(private _dcl: DynamicComponentLoader, private _er: ElementRef) {}

  addComponent() {
    if (this.limitComponent < 2) {
      this._dcl.loadIntoLocation(VolumeComponent, this._er, 'componentContainer').then((ref) => {
        ref.instance._ref = ref;
        ref.instance._limitComponent = this.limitComponent++;
        ref.instance.lowerIndex.subscribe(v => {
          this.limitComponent--;
        });
      });
    }

    if (this.idx < 4) {
        this._dcl.loadIntoLocation(DynamicCmp, this._e, 'location').then((ref) => {
          ref.instance._ref = ref;
          ref.instance._idx = this.idx++;
          ref.instance.lowerIndex.subscribe(v => {
            this.idx--;
            console.log("subtracted");
          });
        });

        console.log("added")
    }
  }

  lowerCompCount(bool) {
    console.log(bool);
    if (bool == true) {
      this.limitComponent--;
    }
  }
}
