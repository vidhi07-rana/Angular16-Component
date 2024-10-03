import { HttpClient, HttpParams } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { User } from "../auth/user.model";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
constructor(private http:HttpClient, private recipeService: RecipeService, private authService:AuthService){

}

storeRecipe(){
const recipe = this.recipeService.getRecipes();
return this.http.put("https://recipe-book-ang-ebd9c-default-rtdb.firebaseio.com/recipe.json",recipe ).subscribe(response=>{console.log(response)})
}

fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }




}