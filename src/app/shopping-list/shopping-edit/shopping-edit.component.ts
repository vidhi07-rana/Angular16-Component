import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
subscription : Subscription
editedItemIndex:number;
editMode=false;


constructor(private shoppingListService:ShoppingListService ){}


ngOnInit(): void {
  this.subscription=this.shoppingListService.startedEditing.subscribe(
    {
      next:((index:number)=>{
        this.editedItemIndex=index
        this.editMode=true
      })
    }
  )
}

  onAdd(form : NgForm){
    const value = form.value;
    const newIngrident = new Ingredient(value.name,value.amount )
    this.shoppingListService.addIngredient(newIngrident)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
