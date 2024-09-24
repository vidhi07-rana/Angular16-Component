import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
@Input() recipe : Recipe

constructor( private recipeService: RecipeService){}

AddToShoppingList(){
  this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)

}
}
