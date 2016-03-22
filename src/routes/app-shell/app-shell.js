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
var stock_information_service_1 = require('../../core/stock-information.service');
var http_1 = require('angular2/http');
var angular2_highcharts_1 = require('angular2-highcharts');
var AppShell = (function () {
    // private _children:ComponentRef[] = [];
    function AppShell(_stockInformationService, _dcl, _er) {
        this._stockInformationService = _stockInformationService;
        this._dcl = _dcl;
        this._er = _er;
    }
    AppShell.prototype.requestData = function (symbol) {
        var _this = this;
        this._stockInformationService.getData(symbol)
            .subscribe(function (data) {
            // Format Data
            var parseData = [];
            for (var i = 0; i < data.query.results.quote.length; i++) {
                var date = new Date(data.query.results.quote[i].Date).getTime();
                var volume = parseInt(data.query.results.quote[i].Volume);
                parseData.unshift([date, volume]);
            }
            // Set Chart Options
            _this.options = {
                title: { text: "Volume for " + data.query.results.quote[0].Symbol },
                chart: {
                    alignTicks: false
                },
                rangeSelector: {
                    selected: 1
                },
                series: [{
                        type: 'column',
                        name: 'AAPL',
                        data: parseData
                    }],
                legend: {
                    enabled: false
                }
            };
        }, function (error) { return console.log("Error: " + error); });
    }; // requestData function end
    AppShell = __decorate([
        core_1.Component({
            selector: 'app-shell',
            template: require('./app-shell.html'),
            directives: [volume_1.VolumeComponent, angular2_highcharts_1.CHART_DIRECTIVES],
            providers: [http_1.JSONP_PROVIDERS, stock_information_service_1.StockInformationService]
        }), 
        __metadata('design:paramtypes', [stock_information_service_1.StockInformationService, core_1.DynamicComponentLoader, core_1.ElementRef])
    ], AppShell);
    return AppShell;
}());
exports.AppShell = AppShell;
//# sourceMappingURL=app-shell.js.map