import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  actions : Array<any> = [
    { title : 'Home' ,path : "/home", icon: "bi-house-gear-fill" , animation: "animation-delay: 0ms"},
    { title : 'Products' ,path : "/products", icon: "bi bi-cart-check-fill", animation: "animation-delay: 5ms" },
    { title : 'New Product', path : "/newProduct", icon: "bi bi-plus-circle-fill" , animation: "animation-delay: 10ms"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
