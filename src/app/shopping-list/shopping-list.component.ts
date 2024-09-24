import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
ingredient:Ingredient[];
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.ingredient=this.shoppingListService.getIngrident()
    this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredient[] )=>{
      this.ingredient = ingredient
    })
  }


}
