import { Component, OnInit, Inject, Output, EventEmitter, ɵALLOW_MULTIPLE_PLATFORMS, OnDestroy } from '@angular/core';
import { ViewChild } from 'ngx-onsenui';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Stories } from 'src/app/models/story.model';
import { ShareTabService } from 'src/app/services/share-tab.service';
import { IonSlides } from '@ionic/angular';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(500, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(500, keyframes(kf.swipeleft))),
      // transition('* => *', animate(250 , keyframes(kf.fadein))),
      transition('swipeleft => *', animate(250 , keyframes(kf.slidefromright))),
      transition('swiperight => *', animate(250 , keyframes(kf.slidefromleft)))
      // transition(':enter', animate(500, keyframes(kf.enter)))
    ])
  ]
})
export class StoriesComponent implements OnInit, OnDestroy {

  @ViewChild("mySlider") slides: IonSlides;

  favourite_stories = [];
  all_stories;
  liked = [];
  active = [];

  i = 0;
  animationState: string;
  len = 0;

  private sub: Subscription;

  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `../../../assets/sample_stories/ss${n}.jpg`);
  stories$: Observable<Stories>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private apiservice: ApiService,
              private shareTabService: ShareTabService) {}

  ngOnInit(): void {
    this.stories$ = this.apiservice.stories.get();
    this.sub = this.stories$.subscribe((data: Stories) => {
      console.log(data);
      this.all_stories = data.stories;
      var l = this.all_stories.length;
      var i = 0;
      for(i = 0; i < l; i++){
        if(this.all_stories[i].isLiked)
          this.liked.push("like_y");
        else
          this.liked.push("like_n");
        if(i < 7)
          this.active.push("dot");
      }
      this.len = l;
      // this.active[0] = "dot_active";
    });
    // var ind;
    // for(ind = 0; ind < 10; ind++){
    //   this.liked.push("like_n");
    //   this.active.push("dot");
    // }
    // this.active[0] = "dot_active";
    // this.startAnimation(this.images);
  }

  get_class(i, ind){
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
      var j = 7;
      for(j = 7; j >= 1; j--){
        if(ind == i - j){
          return "dot_active";
        }
        else {
          return "dot";
        }
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

  // prev() {
  //   console.log("here prev");
  //   console.log(this.carousel);
  //   this.carousel.nativeElement.prev();
  // }
  // next() {
  //   console.log("here next");
  //   console.log(this.carousel);
  //   this.carousel.nativeElement.next();
  // }

  shop_now(story){
    this.document.location.href = story.targetUrl;
    // console.log("stories: ",this.stories);
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
  }

  add_like(story, i){
    var index = this.favourite_stories.indexOf(story);
    if(index > -1){
      this.liked[i] = "like_n";
      this.favourite_stories.splice(index, 1);
      console.log(this.favourite_stories);
      return;
    }
    this.favourite_stories.push(story);
    this.liked[i] = "like_y";
    console.log(this.favourite_stories);
    return;
  }

  change_dots(event){
    var prevind = event.lastActiveIndex;
    var curind = event.activeIndex;
    this.active[prevind] = "dot";
    this.active[curind] = "dot_active";
  }

  // swipe_left(i){
  //   console.log("left", i);
  //   if(i == this.active.length - 1){
  //     return;
  //   }
  //   this.active[i] = "dot";
  //   this.active[i + 1] = "dot_active";
  // }

  // swipe_right(i){
  //   console.log("right", i);
  //   if(i == 0){
  //     return;
  //   }
  //   this.active[i] = "dot";
  //   this.active[i - 1] = "dot_active";
  // }

  slidesDidLoad() {
    // this.slides.startAutoplay();
  }


  startAnimation(state) {
    
    if (!this.animationState) {
      this.animationState = state;
    }
    // console.log("start ", state);
  }

  resetAnimationState(state) {
    console.log("reset ", state);
    if(state.toState == "swipeleft"){
      console.log("left");
      this.i = this.i + 1;
      if(this.i == 10)
        this.i = 9;

      this.active[this.i] = "dot_active";
      this.active[this.i - 1] = "dot";
    }
    else if(state.toState == "swiperight"){
      console.log('right');
      this.i = this.i - 1;
      if(this.i == -1)
        this.i = 0;

      this.active[this.i] = "dot_active";
      this.active[this.i + 1] = "dot";
    }
    this.animationState = '';
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
      },
      setTranslate() {
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
    this.sub.unsubscribe();
  }

}
