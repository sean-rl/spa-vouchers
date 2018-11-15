import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from './../models/article.model';
import { VenueDoc } from './search.service';

@Injectable()
export class NewsService {
  private headlines$ = new BehaviorSubject<Partial<Article>[]>(null);
  private articles$ = new BehaviorSubject<Partial<Article>[]>(null);
  private venues$ = new BehaviorSubject<Partial<VenueDoc>[]>(null);

  constructor(private afs: AngularFirestore) {
    const subArticles = this.afs
      .collection('article')
      .valueChanges()
      .pipe(
        tap((articles: Partial<Article>[]) => {
          this.articles$.next(
            articles.filter(
              article =>
                !article.tile ||
                (article && article.tile && article.tile === 'article')
            )
          );
          this.headlines$.next(
            articles.filter(
              article => article && article.tile && article.tile === 'headline'
            )
          );
        })
      )
      .subscribe();
    const subVenues = this.afs
      .collection('venue', ref => ref.limit(5))
      .valueChanges()
      .pipe(
        tap(venues => {
          this.venues$.next(venues);
        })
      ).subscribe();
    // const faked = [{
    //   id: this.afs.createId(),
    //   image: '',
    //   venue: 'ChIJ-06u7YZbdkgRik2YToC0n7s',
    //   heading: 'Neque porro quisquam est qui dolorem',
    //   about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat ex vel sapien fringilla blandit.

    //   Quisque vehicula commodo libero, a vehicula enim tristique sed. Donec eu rutrum ante...`,
    //   author: ' Sean Austin',
    //   published: new Date(),
    //   comments: [],
    //   tag: 'Sample',
    //   markdown: ''
    // },
    // {
    //   id: this.afs.createId(),
    //   image: '',
    //   venue: 'ChIJ0fUzv5RiiEgRlR02w5guJik',

    //   heading: 'Lorem ipsum dolor sit amet',
    //   about: `Neque porro quisquam est qui dolorem, consectetur adipiscing elit. Fusce volutpat ex vel sapien fringilla blandit.

    //   Quisque vehicula commodo libero, a vehicula enim tristique sed. Donec eu rutrum ante...`,
    //   author: ' Ann Presley',
    //   published: new Date(),
    //   comments: [],
    //   tag: 'VISITOR REVIEW',
    //   markdown: ''
    // },
    // {
    //   id: this.afs.createId(),
    //   image: '',
    //   venue: 'ChIJ2QYx_K_Md0gRZo9NxPGpNlk',

    //   heading: 'Quisque vehicula commodo libero',
    //   about: `Consectetur adipiscing elit. Fusce volutpat ex vel sapien fringilla blandit.

    //   Lorem ipsum dolor sit amet. Quisque vehicula commodo libero, a vehicula enim tristique sed. Donec eu rutrum ante...`,
    //   author: ' Spa Vouchers Team',
    //   published: new Date(),
    //   comments: [],
    //   tag: 'SPA BREAK',
    //   markdown: ''
    // }];
    // this.afs.collection('article').add(faked[0]);
    // this.afs.collection('article').add(faked[1]);
    // this.afs.collection('article').add(faked[2]);
  }

  getArticles() {
    return this.articles$;
  }

  getHeadlines() {
    return this.headlines$;
  }
  getVenues() {
    return this.venues$;
  }
}
