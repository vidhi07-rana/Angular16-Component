import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
@Output() recipewasSelected = new EventEmitter<Recipe>();
recipes: Recipe[] = [
  new Recipe('A Test Recipe ', 'This  is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  new Recipe('Another Test Recipe ', 'This  is simply a test','https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')

]
  constructor(){

  }
  ngOnInit(): void {
  }

  onSelected(recipe: Recipe){
this.recipewasSelected.emit(recipe)
  }

}
