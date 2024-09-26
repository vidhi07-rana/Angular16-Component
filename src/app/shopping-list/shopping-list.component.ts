import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredient:Ingredient[];
private igChangeSub: Subscription
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
 this.ingredient=this.shoppingListService.getIngrident()
 this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredient[] )=>{
      this.ingredient = ingredient
    })
  }
ngOnDestroy() {
  this.igChangeSub.unsubscribe()
}

onEditItem(index:number){
  this.shoppingListService.startedEditing.next(index)

}

}
