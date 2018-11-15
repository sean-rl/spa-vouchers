import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'news-article-tile',
  templateUrl: './article-tile.component.html',
  styleUrls: ['./article-tile.component.scss']
})
export class ArticleTileComponent implements OnInit {
  @Input()
  article;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
  imgUrl(url) {
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
