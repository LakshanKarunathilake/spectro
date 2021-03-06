import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
	selector: 'app-news-component',
	templateUrl: './news-component.component.html',
	styleUrls: ['./news-component.component.css']
})
export class NewsComponentComponent implements OnInit {

	news = {
    status: '',
    totalResults: 0,
    articles: [
      {
        source: [{}],
        author: '',
        title: '',
        description: '',
        url:'',
        urlToImage:'',
        publishedAt:'',
        content:''
      }]
  };
	constructor(private dataService: DataService) {

    // console.error("search is on"); // log to console instead
    // this.addHero("search");
  }

	ngOnInit() {
    this.getNews();
	}

	async getNews() {

    const data = await this.dataService.getNEWS('covid-19').toPromise();
    if(!data){
      console.log("no news data.");
    }else{
      console.log("news data available.");
      this.news = JSON.parse(data);
    }


	}

}
