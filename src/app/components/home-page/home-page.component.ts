import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          //alert(`${swipe} ${this.router.url}`);
          let swipeUrl: string;
          if(swipe === 'next')
            swipeUrl = this.nextRoute(this.router.url);
          else if(swipe === 'previous')
            swipeUrl = this.previousRoute(this.router.url);

          if(swipeUrl !== '')
            this.router.navigate([swipeUrl]);
      }
    }
  }

  nextRoute(url: string): string {
    if(url === '/blogs')
      return '/feed';
    else if(url === '/feed')
      return '/brands';
    else if(url === '/brands')
      return '/account';
    else
      return '';
  }

  previousRoute(url: string): string {
    if(url === '/feed')
      return '/blogs';
    else if(url === '/brands')
      return '/feed';
    else if(url === '/account')
      return '/brands';
    else
      return '';
  }
}
