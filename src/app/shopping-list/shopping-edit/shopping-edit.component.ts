import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInputRef : ElementRef
@ViewChild('amountInput') amountInputRef : ElementRef
@Output() ingredientAdded = new EventEmitter<{name: string, amount:number}>()

  onAdd(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngrident = new Ingredient(ingName,ingAmount )
this.ingredientAdded.emit(newIngrident)
  }
}
