import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { PageNotfoundComponent } from "./page-notfound/page-notfound.component";


const appRoutes: Route[]=[
    {path:'', redirectTo:'/recipes', pathMatch: 'full'},
    {path:'recipes', component:RecipesComponent,
        canActivate:[AuthGuard],
        children:[
            {
                path:'', component:RecipeStartComponent
            },
            {
                path:'new', component:RecipeEditComponent
            },
            {
                path:':id', component:RecipeDetailComponent
            },
            {
                path:':id/edit', component:RecipeEditComponent
            }
        ]
    },

    {path:'shopping-list', component:ShoppingListComponent},

    ,{
        path:'auth', component:AuthComponent
    },

    {
        path :'**', component:PageNotfoundComponent
    }



]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}