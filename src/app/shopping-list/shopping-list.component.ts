import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  Ingredient: Ingredient[] =[
    new Ingredient('Corns', 70),
    new Ingredient('Tomatoes', 40),
    new Ingredient('Capsicum', 50)


  ];
  constructor(){}
  ngOnInit() {
  }

}
