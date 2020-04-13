import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareTab } from '../../models';
import { ShareTabService } from 'src/app/services/share-tab.service';
import { Subscription } from 'rxjs';

interface Shareable {
  icon: string;
  targetUrl: string;
  name: string;
}

@Component({
  selector: 'app-share-tab',
  templateUrl: './share-tab.component.html',
  styleUrls: ['./share-tab.component.scss'],
})
export class ShareTabComponent implements OnInit, OnDestroy {
  higher = false;
  shareables: Shareable[] = [
    {name: 'Whatsapp', icon: 'assets/img/shareables/whatsapp.svg', targetUrl: 'https://api.whatsapp.com/send?text='},
    {name: 'Twitter', icon: 'assets/img/shareables/twitter.svg', targetUrl: 'https://twitter.com/intent/tweet?text='},
    {name: 'Telegram', icon: 'assets/img/shareables/telegram.svg', targetUrl: 'tg://msg?text='},
    {name: 'Facebook', icon: 'assets/img/shareables/facebook.svg', targetUrl: 'https://facebook.com/sharer/sharer.php?quote='},
    {name: 'Linkedin', icon: 'assets/img/shareables/linkedin.svg', targetUrl: 'https://linkedin.com/shareArticle?text='},
    {name: 'Gmail', icon: 'assets/img/shareables/gmail.svg', targetUrl: 'mailto:?&subject=Amazing Brand here!&body='}
  ];
  message = 'Checkout this cool brand!\n';
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  state: ShareTab;
  private shareTabSubsctiption: Subscription;
  hasWebApi = false;

  constructor(private shareTabService: ShareTabService) { }

  ngOnInit(): void {
    if ((window.navigator as any).share){
      this.hasWebApi = true;
    }
    this.shareTabSubsctiption = this.shareTabService.shareTabState.subscribe((state: ShareTab) => {
     this.processChange(state);
    });
  }
  ngOnDestroy(): void {
    this.shareTabSubsctiption.unsubscribe();
  }

  toggle(): boolean {
    return  this.shareTabService.toggle();
  }

  goHigher(): void {
    this.higher = true;
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
      if (duration < 1000 && Math.abs(direction[1]) > 10 ) {
        direction[1] < 0 ? this.goHigher() : this.toggle();
      }
    }
  }

  processChange(state: ShareTab) {
    this.state = {...state};
    this.higher = false;
    if (this.hasWebApi && this.state.isActive) {
      const navigator = window.navigator as any;
      navigator.share({
        url: this.state.brandUrl,
        message: this.message
      }).then(_ => this.shareTabService.deactivate())
      .catch(err => {
        this.shareTabService.deactivate();
      });
    }
  }

}
