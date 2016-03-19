import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
@Directive({
    selector: '[vol-chart]',
    inputs: ['dataResponse']
})
export class ChartDirective {
    public data:any = {};
    private ctx:any = {};
    private barChart:any = {};

    constructor(el: ElementRef, renderer: Renderer) {
        this.ctx = el.nativeElement.getContext("2d");
        console.log('this.ctx:')
        console.log(this.ctx)
        this.barChart = new Chart(this.ctx);
    }

    @Input() set dataResponse(data:any){
        if(!!data){
            this.data = data;
            this.barChart.Bar(this.data, {
                responsive: true,
                barValueSpacing: 3,
                barStrokeWidth: 2,
                barShowStroke: true,
                highlightStroke: "rgba(88, 196, 246, 1)"
            });

            console.log(this.barChart)
        }
    }

    
}

