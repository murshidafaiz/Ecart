import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  // all-product
  {
    path:'' , component:AllProductsComponent
  },
  // login
  {
    path:'user/login' ,component:LoginComponent
  },
  // register
  {
    path:'user/register' , component:RegisterComponent
  },
  // cart
  {
    path:'cart' , component:CartComponent
  },
  // checkout
  {
    path:'user/checkout', component:CheckoutComponent
  },
  // wishlist
  {
    path:'wishlist' , component:WishlistComponent
  },
  // view product
  {
    path:'product/view/:id' , component:ViewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
