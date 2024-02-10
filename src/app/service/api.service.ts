import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  wishlistItemCount = new BehaviorSubject(0)
  cartItemCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")
  cartTotalAmount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    // this.getWishlistCount()
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }
  
  getAllProductsAPI = ()=>{
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  viewProductAPI = (id:any)=>{
     return this.http.get(`${this.SERVER_URL}/products/view/${id}`)
  }

  // register
  registerAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

   // login
   loginAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  appendTokenHeader = ()=>{
    let headers = new HttpHeaders()

    if(sessionStorage.getItem("token")){
      const token = JSON.parse(sessionStorage.getItem("token")||'')
       headers = headers.append("Authorization",`Bearer ${token}`)
       return {headers}
      }
      return {headers}
    }
   
  

  // addtoWishlist
  addToWishlistAPI = (reqBody:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/wishList/add`,reqBody,this.appendTokenHeader())
  }

  // getWishlist
  getWishlistAPI = ()=>{
    return this.http.get(`${this.SERVER_URL}/user/wishList`,this.appendTokenHeader())
  }

  // getWishlistCount
  getWishlistCount = ()=>{
    this.getWishlistAPI().subscribe((res:any)=>{
       this.wishlistItemCount.next(res.length)   
    })
  }

  // deleteWishlist
  deleteWishlistItemAPI = (productId:any)=>{
     return this.http.delete(`${this.SERVER_URL}/user/wishList/remove/${productId}`,this.appendTokenHeader())
  }

  
  // addtoCart
  addToCartAPI = (reqBody:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/cart/add`,reqBody,this.appendTokenHeader())
  }

  // getCartCount
  getCartAPI = ()=>{
    return this.http.get(`${this.SERVER_URL}/user/cart`,this.appendTokenHeader())
  }

   // getCartCount
   getCartCount = ()=>{
    this.getCartAPI().subscribe((res:any)=>{
       this.cartItemCount.next(res.length)   
    })
  }

  // incrementCart
  incrementCartItemAPI = (id:any)=>{
    return this.http.get(`${this.SERVER_URL}/user/cart/increment/${id}`,this.appendTokenHeader())
  }

  // decrementCart
  decrementCartItemAPI = (id:any)=>{
    return this.http.get(`${this.SERVER_URL}/user/cart/decrement/${id}`,this.appendTokenHeader())
  }

  // deleteCartItem
  removeCartItemAPI = (id:any)=>{
       return this.http.delete(`${this.SERVER_URL}/user/cart/remove/${id}`,this.appendTokenHeader())
  }

  // emptyCart
  emptyCartItemAPI = ()=>{
    return this.http.delete(`${this.SERVER_URL}/user/cart/empty`,this.appendTokenHeader())
}

}
