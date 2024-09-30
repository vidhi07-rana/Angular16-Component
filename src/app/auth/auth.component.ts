import { Component } from "@angular/core";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.Component.html',
})

export class AuthComponent{
isLoginMode = true

onSwitchMode(){
    this.isLoginMode= !this.isLoginMode
}
}