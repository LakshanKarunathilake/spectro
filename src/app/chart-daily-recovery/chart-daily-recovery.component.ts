
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexGrid,
  ApexFill,
  ApexMarkers,

} from 'ng-apexcharts';
@Component({
  selector: 'app-chart-daily-recovery',
  templateUrl: './chart-daily-recovery.component.html'
})
export class ChartDailyRecoveryComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  daily_updates: any;
  daily_recovery: any = [];
  daily_new_recovery: any = [];
  date_list: any = [];
  public chartOptions: any;

  constructor(private dataService: DataService) {

    this.getNewCases();

  }




  async getNewCases() {


    this.daily_updates = await this.dataService.getCSVdaily().toPromise();
    this.date_list = this.daily_updates.split(/\r\n|\n/)[0].split(',');
    this.daily_recovery = this.daily_updates.split(/\r\n|\n/)[3].split(',');

    this.date_list = this.date_list.reverse().slice(0, 20);
    this.date_list.reverse();

    this.daily_recovery = this.daily_recovery.reverse().slice(0, 21);
    this.daily_recovery.reverse();

    this.daily_recovery.forEach((v, i) => {
      if (i < 20) {
        this.daily_new_recovery.push((this.daily_recovery[i + 1] - v));
      }

    });




    this.chartOptions = {
      series: [
        {
          name: 'Daily Recovery',
          data: this.daily_new_recovery
        }

      ],
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top' // top, center, bottom
          }
        }
      },
      colors: ['#47AC47'],
      dataLabels: {
        offsetY: -20,
        style: {
          fontSize: "11px",
          colors: ["#304758"]
        }
      },

      chart: {
        height: 350,

        type: 'bar',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        type: 'datetime',
        categories: this.date_list,
        position: 'bottom'
      },
      title: {
        text: '',
      },
      fill: {
        type: 'solid',
        colors: ['#47AC47'],

      },

      yaxis: {
        min: 0,
        max: 70,
        title: {
          text: ''
        }
      }
    };
  }

  ngOnInit(): void {

  }

}
