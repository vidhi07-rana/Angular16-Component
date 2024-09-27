import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject()
  private recipe: Recipe[] = [
    new Recipe('Ham Burger', 
      'A delicious meal',
      'https://www.blondelish.com/wp-content/uploads/2019/02/Easy-Veggie-Burger-Recipe-Vegan-Healthy-8.jpg',[
        new Ingredient('meat', 1),
        new Ingredient('frech fries', 3)
      ]
      ),
    new Recipe(
      'Thai Pizaa ', 
            'Razzo’s has the best Italian by far in the Springfield area',

   'https://tse3.mm.bing.net/th/id/OIP.AIzaaQhpstmLtlqOcbl3zgHaHa?w=700&h=700&rs=1&pid=ImgDetMain', [  new Ingredient('bread', 4)
    ]
  )
  
  ]
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipe.slice()
  }  

  getRecipe(index:number){
    return this.recipe[index]

  }

  addIngredientToShoppingList(ingredient: Ingredient[]){
    this.shoppingListService.addIngridents(ingredient)
  }

  addRecipe(recipe: Recipe){
    this.recipe.push(recipe);
    this.recipeChanged.next(this.recipe.slice())

  }

  updateRecipe(index:number, newRecipe:Recipe){
this.recipe[index]= newRecipe;
this.recipeChanged.next(this.recipe.slice())

  }

  DeleteRecipe(index:number){
    this.recipe.splice(index,1)
    this.recipeChanged.next(this.recipe.slice())


  }
}
