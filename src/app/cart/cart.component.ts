import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any = []
  cartTotalPrice:number = 0
  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }
    else{
      alert("Please Login...")
    }
  }

  getCart(){
    this.api.getCartAPI().subscribe({
      next:(res:any)=>{
        this.cart = res
        console.log(this.cart);
        this.api.getCartCount()
        this.getCartTotalPrice()
      },
      error:(err:any)=>{
        alert(err.error)
      }
    })
  }

  getCartTotalPrice(){
    if(this.cart.length>0){
      let total = 0
      this.cart.forEach((item:any)=>{
        total+=item.totalPrice
        this.cartTotalPrice = Math.ceil(total)
      })
    }
    else{
      this.cartTotalPrice = 0
    }
  }

  incrementQuantity(id:any){
      this.api.incrementCartItemAPI(id).subscribe({
        next:(res:any)=>{
          this.getCart()
          this.getCartTotalPrice()
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err.error);
          
        }
      })
  }

  decrementQuantity(id:any){
    this.api.decrementCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }

  removeItem(id:any){
      this.api.removeCartItemAPI(id).subscribe({
        next:(res:any)=>{
          this.getCart()
          this.getCartTotalPrice()
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err.error);
          
        }
      })
  }

  emptyCart(){
    this.api.emptyCartItemAPI().subscribe({
      next:(res:any)=>{
        this.getCart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }
 
  checkOut(){
    this.api.cartTotalAmount.next(this.cartTotalPrice)
    this.router.navigateByUrl('/user/checkout')
  }

}
