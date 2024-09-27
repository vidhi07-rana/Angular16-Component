import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slform: NgForm;
  subscription : Subscription
editedItemIndex:number;
editMode=false;
editItem:Ingredient;

constructor(private shoppingListService:ShoppingListService ){}


ngOnInit(): void {
  this.subscription=this.shoppingListService.startedEditing.subscribe(
    {
      next:((index:number)=>{
        this.editedItemIndex=index
        this.editMode=true;
        this.editItem = this.shoppingListService.getIngredient(index)
        this.slform.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
     
      })
    }
  )
}

  onSubmit(form : NgForm){
    const value = form.value;
    const newIngrident = new Ingredient(value.name,value.amount )
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngrident)
    }else{
      this.shoppingListService.addIngredient(newIngrident)

    }
this.editMode=false
    form.reset( )
  }

  onClear(){
    this.slform.resetForm();
    this.editMode=false
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex)

  }





  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
