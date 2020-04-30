import { Component, OnInit, Inject, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { ShareTabService } from 'src/app/services/share-tab.service';
import { IonSlides } from '@ionic/angular';
import { FavButtonService } from '../../services/fav-button.service';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition(':enter', animate("500ms ease-in", keyframes(kf.enter))),
      transition(':leave', animate("500ms ease-out", keyframes(kf.exit)))
    ])
  ]
})
export class StoriesComponent implements OnInit, OnDestroy {

  @ViewChild("mySlider") slides: IonSlides;

  isClicked = false;

  favourite_stories = [];
  all_stories;
  liked = [];
  active = [];

  i = 0;
  animationState: string;
  len = 0;

  slidesLoaded = false;

  sub: Subscription;

  private sub2: Subscription;
  favBtnEnabled: boolean;

  private sub3: Subscription;
  private sub4: Subscription = null;
  private sub5: Subscription = null;

  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);
  stories$: Observable<Stories>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              private shareTabService: ShareTabService,
              private favButtonService: FavButtonService ) {}

  ngOnInit(): void {
    this.stories$ = this.apiservice.stories.get();
    this.sub = this.stories$.subscribe((data: Stories) => {
      console.log(data);
      this.all_stories = data.stories;
      this.all_stories.reverse();
      var l = this.all_stories.length;
      var i = 0;
      for(i = 0; i < l; i++){
        if(this.all_stories[i].isLiked) {
          this.liked.push("like_y");
        }
        else {
          this.liked.push("like_n");
        }
        if(i < 7)
        this.active.push("dot");
      }
      this.len = l;
    });

    this.sub2 = this.favButtonService.favEnabled.subscribe(enabled => this.favBtnEnabled = enabled);
    this.favButtonService.toggleBtnView(true);
  }

  get_class(ind){
    var i = parseInt(this.document.getElementsByClassName("swiper-slide-active")[0].id);
    if(i < 6){
      if(this.len > 7){
        if(ind == 6){
          return "dot_small";
        }
      }
      if(i == ind){
        return "dot_active";
      }
      else{
        return "dot";
      }
    }
    else if(i > (this.len - 7)){
      if(this.len > 7){
        if(ind == 0){
          return "dot_small";
        }
      }
      if(i - ind + 7 == this.len){
        return "dot_active";
      }
      else {
        return "dot";
      }
    }
    else {
      if(ind == 0 || ind == 6){
        return "dot_small";
      }
      if(ind == 3){
        return "dot_active";
      }
      else{
        return "dot";
      }
    }
  }

  get_duration(story){
    const date1 = new Date(story.postedAt);
    const date2 = new Date();
    const utc_date2 = new Date(date2.getTime() + date2.getTimezoneOffset() * 60000);
    const diffTime = Math.abs(utc_date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMins = Math.ceil(diffTime / (1000 * 60 ));
    if (diffHours >= 24) {
      return diffDays.toString() + ' d';
    }
    else if (diffMins >= 60){
      return diffHours.toString() + ' h';
    }
    return diffMins.toString() + ' m';
  }

  activateShare(brandUrl: string) {
    console.log('activating share');
    this.shareTabService.activate(brandUrl);
    // this.isClicked = !this.isClicked;
  }

  add_like(story, i){
    if(this.liked[i] == "like_y") {
      this.liked[i] = "like_n";
      this.sub4 = this.apiservice.stories.unlike(story.storyId).subscribe(()=> {});
    }
    else {
      this.liked[i] = "like_y";
      this.sub5 = this.apiservice.stories.like(story.storyId).subscribe(()=> {});
    }
    if(this.isSingleClick) {
      // this.isClicked = !this.isClicked;
    }
    return;
  }

  change_dots(event){
    var prevind = event.lastActiveIndex;
    var curind = event.activeIndex;
    this.active[prevind] = "dot";
    this.active[curind] = "dot_active";
  }

  slidesDidChange() {
    // this.slides.startAutoplay();
    // console.log("here");
    this.slidesLoaded = true;
    this.active.push(0);
    this.active.pop();
  }

  // ==> Coverflow
  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
        // swiper.params.touchReleaseOnEdges = true;
        // swiper.originalParams.touchReleaseOnEdges = true;
        // swiper.passedParams.touchReleaseOnEdges = true;
      },
      setTranslate() {
        // console.log("translate");
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // console.log(swiper);
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          // if (params.slideShadows) {
          //   // Set shadows
          //   let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          //   let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          //   if ($shadowBeforeEl.length === 0) {
          //     $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
          //     $slideEl.append($shadowBeforeEl);
          //   }
          //   if ($shadowAfterEl.length === 0) {
          //     $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
          //     $slideEl.append($shadowAfterEl);
          //   }
          //   if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          //   if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          // }
        }

         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }

  }

  ngOnDestroy(): void {
    this.favButtonService.toggleBtnView(false);
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  isSingleClick: Boolean = true;
  
  toggleIsClicked() {
    this.isSingleClick = true;
    setTimeout(()=>{
        if(this.isSingleClick){
          console.log("here");
          this.isClicked = !this.isClicked;
        }
      },200);
  }

  double_tap() {
    this.isSingleClick = false;
    var unlike = false;
    this.slides.getActiveIndex().then(i => {
      var story = this.all_stories[i];
      if(this.liked[i] == "like_y") {
        unlike = true;
      }
      else {
        this.add_like(story, i);
        this.document.getElementById("likeimg").style.display = "block";
        setTimeout(() => {
          this.document.getElementById("likeimg").style.display = "none";
        }, 1000);
      }
    });
  }

  
}
