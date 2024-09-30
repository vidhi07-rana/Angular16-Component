import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
constructor(private http:HttpClient, private recipeService: RecipeService){

}

storeRecipe(){
const recipe = this.recipeService.getRecipes();
return this.http.put("https://recipe-book-ang-ebd9c-default-rtdb.firebaseio.com/recipe.json",recipe ).subscribe(response=>{console.log(response)})
}

fetchRecipe(){
    return this.http.get<Recipe[]>("https://recipe-book-ang-ebd9c-default-rtdb.firebaseio.com/recipe.json").subscribe(recipes =>{
        console.log(recipes)
        this.recipeService.setRecipes(recipes)

    })
}


}