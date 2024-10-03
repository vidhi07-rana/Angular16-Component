import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
private userSub : Subscription
isAuthenticated = false

  constructor(private dataStorageService: DataStorageService, 
    private authService : AuthService){

  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user ? false: true
      console.log(!!user)
    })
  }
  onSave(){
    this.dataStorageService.storeRecipe()

  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
  }
  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
  onLogOut(){
    this.authService.logout()
  }

}
