import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

interface Shareable {
  icon: string;
  targetUrl: string;
  name: string;
}

@Component({
  selector: 'app-share-tab',
  templateUrl: './share-tab.component.html',
  styleUrls: ['./share-tab.component.scss']
})
export class ShareTabComponent implements OnInit {
  active = false;
  higher = false;
  shareables: Shareable[] = [
    {name: 'Whatsapp', icon: 'assets/img/shareables/whatsapp.svg', targetUrl: 'whatsapp://send?text='},
    {name: 'Twitter', icon: 'assets/img/shareables/twitter.svg', targetUrl: 'https://twitter.com/intent/tweet?text='},
    {name: 'Telegram', icon: 'assets/img/shareables/telegram.svg', targetUrl: 'tg://msg?text='},
    {name: 'Facebook', icon: 'assets/img/shareables/facebook.svg', targetUrl: 'https://facebook.com/sharer/sharer.php?text='},
    {name: 'Linkedin', icon: 'assets/img/shareables/linkedin.svg', targetUrl: 'https://linkedin.com/shareArticle?text='},
    {name: 'Gmail', icon: 'assets/img/shareables/gmail.svg', targetUrl: 'mailto:?&subject=Amazing Brand here!&body='}
  ];
  message = 'Checkout this cool brand!';
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): boolean {
    this.active = !this.active;
    this.higher = false;
    return this.active;
  }

  goHigher(direction: string): void {
    this.higher = direction === 'up';
  }

swipe(e: TouchEvent, when: string): void {
  console.log(e, when)
  const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
  const time = new Date().getTime();

  if (when === 'start') {
    this.swipeCoord = coord;
    this.swipeTime = time;
  } else if (when === 'end') {
    const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
    const duration = time - this.swipeTime;
    console.log('dir', direction[1]);
    if (duration < 1000 //
      && Math.abs(direction[1]) > 10 ) {
        const swipe = direction[1] < 0 ? 'up' : 'down';
        console.log(swipe);
        this.goHigher(swipe);
    }
  }
}

}
