import { keyframes, style,animate } from '@angular/animations';

export const swiperight = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(200%, 0, 0) rotate3d(0, 0, 1, 45deg)', opacity: 0 }),
]

export const swipeleft = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(-200%, 0, 0) rotate3d(0, 0, 1, -45deg)', opacity: 0 }),
]

export const fadein =  [ 
    style({ opacity: 0 }), 
    style({opacity: 1})
]

export const slidefromright = [
  style({transform: 'translateX(100%) rotate3d(0, 0, 1, 0)' , opacity: 0}),
  style({transform: 'translateX(0)', opacity: 1})
]

export const slidefromleft = [
  style({transform: 'translateX(-100%) rotate3d(0, 0, 1, 0)' , opacity: 0}),
  style({transform: 'translateX(0)', opacity: 1})
]

export const enter = [
  style({transform: 'translateX(100%) rotate3d(0, 0, 1, -45deg)' , opacity: 0}),
  style({transform: 'translateX(0)', opacity: 1})
]