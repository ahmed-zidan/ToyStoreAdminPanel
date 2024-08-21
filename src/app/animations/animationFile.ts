import { animate, style, transition, trigger } from "@angular/animations";

export const animateLeft =  trigger('animateLeft',[
  transition(":enter",[
    style({opacity:0, transform: 'translateX(-100%)'}),
    animate('0.5s ease-out' , style({opacity:1, transform: 'translateX(0)'}))
  ]),
  transition(":leave" , [
    animate("0.5s ease-in" , style({opacity:0 , transform:"translateX(100%)"}))
  ])
]);

export const animateRight = trigger("animateRight" , [
  transition(":enter" , [
    style({opacity:0 , transform:"translateX(100%)"}),
    animate('0.5s ease-out' , style({opacity:1 , transform:'translateX(0)'}))
  ]),
  transition(":leave" , [
    animate("0.5s ease-in" , style({opacity:0 , transform:"translateX(-100%)"}))
  ])
])

export const animatePopUp = trigger('animatePopUp',[
  transition(":enter",[
    style({opacity:0 , transform:'scale(0.5)'}),
    animate('0.5s ease-out' , style({opacity:1 , transform:"scale(1)"}))
  ]),
  transition(":leave" , [
    animate("0.5s ease-in" , style({opacity:0 , transform:"scale(0.5)"}))
  ])
])


