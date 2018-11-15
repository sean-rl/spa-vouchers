import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'news-headline-tile',
  templateUrl: './headline-tile.component.html',
  styleUrls: ['./headline-tile.component.scss']
})
export class HeadlineTileComponent implements OnInit {
  @Input()
  article;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
  imgUrl(url) {
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
