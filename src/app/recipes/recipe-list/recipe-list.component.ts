import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[] = [
  new Recipe('A Test Recipe ', 'This  is simply a test', 'https://www.twospoons.ca/wp-content/uploads/2020/09/vegan-stuffed-peppers-easy-recipe-plant-based-twospoons-5-1229x1536.jpg'),
  new Recipe('A Test Recipe ', 'This  is simply a test','https://www.inspiredtaste.net/wp-content/uploads/2019/02/Vegetable-Spaghetti-Recipe-2-1200.jpg')

]
  constructor(){

  }
  ngOnInit(): void {
  }

}
