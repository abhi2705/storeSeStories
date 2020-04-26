import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit, OnDestroy {

  active: number;
  private mapping = {
    blogs: 0,
    feed: 1,
    brands: 2,
    account: 3
  }
  private sub: Subscription;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.active = this.getTabFromUrl(this.router.url);
    this.sub = this.router.events.pipe(filter( event => event instanceof  NavigationEnd))
    .subscribe((e: NavigationEnd) => {
      this.active = this.getTabFromUrl(e.urlAfterRedirects);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getTabFromUrl(url: string): number {
    const tab = this.mapping[url.split('/')[1]];
    return tab !== undefined ? tab : -1;
  }

  handleClick(target: number): void {
    if (target === this.active) {
      return;
    }
    this.active = target;
  }

}
