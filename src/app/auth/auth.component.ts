import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy{
  @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub :Subscription

  constructor(private authService: AuthService, private router : Router, private componentFactoryRaesolver: ComponentFactoryResolver) {}

  // Method to switch between login and sign-up modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Method to handle form submission
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    this.error = null; // Reset any previous error

    // Determine if it's login or sign-up mode and assign the observable accordingly
    if (this.isLoginMode) {
      authObs = this.authService.lognIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    // Subscribe to the observable for handling both login and sign-up requests
    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false; // Stop loading after success
      this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        console.error('Login error:', errorMessage); // Log detailed error
        this.error = errorMessage; 
        this.showErrorAlert(errorMessage)
        this.isLoading = false; // Stop loading after error
      }
    );

    // Reset the form after submission
    form.reset();
  }
  onclosehandle(){
this.error=''
    console.log("alert closed")
  }


  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }

  private showErrorAlert(message:string){
const alertCmpFactory = this.componentFactoryRaesolver.resolveComponentFactory(AlertComponent);
const hostViewContainerRef=this.alertHost.viewContainerRef
hostViewContainerRef.clear();

const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
  
componentRef.instance.message=message
this.closeSub=componentRef.instance.close.subscribe(()=>{
  this.closeSub.unsubscribe()
  hostViewContainerRef.clear()
})
}
}
