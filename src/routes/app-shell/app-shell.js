"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
require('./app-shell.scss');
var volume_1 = require('../../components/volume/volume');
var AppShell = (function () {
    // private _children:ComponentRef[] = [];
    function AppShell(_dcl, _er) {
        this._dcl = _dcl;
        this._er = _er;
        this.limitComponent = 0;
    }
    AppShell.prototype.addComponent = function () {
        var _this = this;
        if (this.limitComponent < 2) {
            this._dcl.loadIntoLocation(volume_1.VolumeComponent, this._er, 'componentContainer').then(function (ref) {
                ref.instance._ref = ref;
                ref.instance._limitComponent = _this.limitComponent++;
                ref.instance.lowerIndex.subscribe(function (v) {
                    _this.limitComponent--;
                });
            });
        }
        if (this.idx < 4) {
            this._dcl.loadIntoLocation(DynamicCmp, this._e, 'location').then(function (ref) {
                ref.instance._ref = ref;
                ref.instance._idx = _this.idx++;
                ref.instance.lowerIndex.subscribe(function (v) {
                    _this.idx--;
                    console.log("subtracted");
                });
            });
            console.log("added");
        }
    };
    AppShell.prototype.lowerCompCount = function (bool) {
        console.log(bool);
        if (bool == true) {
            this.limitComponent--;
        }
    };
    AppShell = __decorate([
        core_1.Component({
            selector: 'app-shell',
            template: require('./app-shell.html'),
            directives: [volume_1.VolumeComponent]
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef])
    ], AppShell);
    return AppShell;
}());
exports.AppShell = AppShell;
//# sourceMappingURL=app-shell.js.map