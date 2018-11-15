import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home-article-tile',
  templateUrl: './home-article-tile.component.html',
  styleUrls: ['./home-article-tile.component.scss']
})
export class HomeArticleTileComponent implements OnInit {
  @Input()
  article;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
  imgUrl(url) {
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
