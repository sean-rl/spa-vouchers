import { NewsService } from './../../_shared/services/news.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../_shared/models/article.model';

@Component({
  selector: 'news-page',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsPageComponent implements OnInit {
  headlines$: Observable<Partial<Article>[]>;
  articles$: Observable<Partial<Article>[]>;
  featured$: Observable<any[]>;

  constructor(
    private newsService: NewsService
  ) {
    this.articles$ = newsService.getArticles();
    this.headlines$ = newsService.getHeadlines();
    this.featured$ = newsService.getVenues();
  }

  ngOnInit() {}
}
