import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{

  username:string = ""
  wishlistCount:Number = 0
  cartCount:Number = 0
  constructor(private api:ApiService){}
  
  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
      this.username = JSON.parse(sessionStorage.getItem("existingUser") || '').username
      this.getWishlistCount()
      this.getCartCount()
    }
    else{
      this.username = ""
      this.wishlistCount = 0
    }
  }

  getWishlistCount(){
    this.api.wishlistItemCount.subscribe((res:any)=>{
      this.wishlistCount = res
      console.log(this.wishlistCount);
      
    })
  }

  getCartCount(){
    this.api.cartItemCount.subscribe((res:any)=>{
      this.cartCount = res
      console.log(this.cartCount);
      
    })
  }

  getSearchKey(search:any){
    console.log(search.value);
    this.api.searchKey.next(search.value)
    
  }

}
