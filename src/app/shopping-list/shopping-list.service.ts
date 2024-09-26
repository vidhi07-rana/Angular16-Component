import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingredientChanged = new Subject<Ingredient[]>()
startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Corns', 70),
    new Ingredient('Tomatoes', 40),
    new Ingredient('Capsicum', 50)
  ];
  
  constructor() { }
  getIngrident(){
  return  this.ingredients.slice();
  }

  addIngredient(ingrident:Ingredient){
 this.ingredients.push(ingrident)
 this.ingredientChanged.next(this.ingredients.slice())
  }

  addIngridents(ingredients: Ingredient[]){
// for(let ingredient of ing){
// this.addIngredient(ingredient);
// }
this.ingredients.push(...ingredients)
this.ingredientChanged.next(this.ingredients.slice())

  }

}
