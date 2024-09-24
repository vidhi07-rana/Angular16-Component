import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInputRef : ElementRef
@ViewChild('amountInput') amountInputRef : ElementRef

constructor(private shoppingListService:ShoppingListService ){}
  onAdd(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngrident = new Ingredient(ingName,ingAmount )
    this.shoppingListService.addIngredient(newIngrident)
  }
}
