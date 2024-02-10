import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit  {

    allProducts:any = []
    searchString:string = ""
    constructor(private api:ApiService){} 

    ngOnInit(): void {
      this.getAllProducts()
      this.api.searchKey.subscribe((data:any)=>{
        this.searchString = data
      })
    }

    getAllProducts = ()=> {
      (this.api.getAllProductsAPI()).subscribe({
        next:(res:any)=>{
           this.allProducts = res
          console.log(this.allProducts);
           
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    addtoWishlist = (product:any)=>{
      if(sessionStorage.getItem("token")){
        // alert("Proceeded to wishlist")
        this.api.addToWishlistAPI(product).subscribe({
          next:(res:any)=>{
           console.log(res);
           this.api.getWishlistCount()
           alert(`${res.title} added to your Wishlist`)
          },
          error:(err:any)=>{
            alert(err.error)
          }
        })
        
      }
      else{
        alert("Please Login...")
      }
    }

    addToCart = (product:any)=>{
      if(sessionStorage.getItem("token")){
        // add quantity key with value 1 to product object
        Object.assign(product,{quantity:1})
        // console.log(product);
        this.api.addToCartAPI(product).subscribe({
          next:(res:any)=>{
            this.api.getCartCount()
            alert(res)
          },
          error:(err:any)=>{
           console.log(err);
           
          }
        })
        
        // alert("Proceeded to Cart")
      }
      else{
        alert("Please Login...")
      }
    }
}
