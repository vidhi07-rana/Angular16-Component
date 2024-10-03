import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null)
  
  constructor(private http: HttpClient, private router : Router) {}

  // Method for signing up the user
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW88UcaGPfsTQ1dbDpKhC3S1bSeWtwlf4',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError), tap(resData=>{
        this.handleAuthentication(resData.email, resData.localId,resData.idToken,+resData.expiresIn)
  })
    );
  }

  // Method for logging in the user
  lognIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW88UcaGPfsTQ1dbDpKhC3S1bSeWtwlf4',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),tap(resData=>{
        this.handleAuthentication(resData.email, resData.localId,resData.idToken,+resData.expiresIn)
  })

    );
  }



  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
  }

  


private handleAuthentication(email:string,userId:string, token:string,expiresIn: number){
  const expirationDate = new Date(new Date().getTime()+ +expiresIn * 1000)
  const user = new  User(email,userId,token,expirationDate)
    this.user.next(user)
    localStorage.setItem('userData' , JSON.stringify(user))
}

  // Handle errors from the HTTP requests
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    // Log the full error response for debugging
    console.log('Full error response:', errorRes);

    // Check if the error response contains the expected structure
    if (errorRes.error && errorRes.error.error && errorRes.error.error.message) {
      // Switch case based on the actual error message from the response
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email is not registered';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is incorrect';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Invalid login credentials';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this user.';
          break;
        case 'MISSING_EMAIL':
          errorMessage = 'Email is required.';
          break;
        case 'MISSING_PASSWORD':
          errorMessage = 'Password is required.';
          break;
        default:
          errorMessage = 'An error occurred during login';
      }
    }

    // Return the extracted error message to the subscription
    return throwError(errorMessage);
  }
}
