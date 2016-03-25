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
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var StockInformationService = (function () {
    function StockInformationService(_jsonp) {
        this._jsonp = _jsonp;
        this.date = new Date();
    }
    StockInformationService.prototype.getData = function (symbol) {
        var year = this.date.getFullYear();
        var month = this.date.getMonth() + 1;
        var day = this.date.getDate();
        var startDate = [year - 1, month, day].join("-");
        var endDate = [year, month, day].join("-");
        var apiRootYahoo = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22";
        // let apiRoot = "http://marketdata.websol.barchart.com/getHistory.json";
        // var params = new URLSearchParams();
        //   params.set('key', '2bdfab4812fc5de3327d3495356cf383');
        //   params.set('symbol', symbol); // the user's search value
        //   params.set('type', 'daily');
        //   params.set('startDate', '20150311000000');
        //   params.set('format', 'json');
        //   params.set('callback', 'JSONP_CALLBACK');
        //
        // return this._jsonp
        //            .get(apiRoot, { search: params })
        //            .map(request => request.results.json());
        var fullURL = apiRootYahoo + symbol + "%22%20and%20startDate%20%3D%20%22" + startDate + "%22%20and%20endDate%20%3D%20%22" + endDate + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSONP_CALLBACK";
        return this._jsonp
            .get(fullURL)
            .map(function (request) { return request.json(); });
    };
    StockInformationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], StockInformationService);
    return StockInformationService;
}());
exports.StockInformationService = StockInformationService;
//# sourceMappingURL=stock-information.service.js.map