import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

    product:any ={}
    constructor(private activateRouteInstance : ActivatedRoute, private api:ApiService){}
    ngOnInit(): void {
      this.activateRouteInstance.params.subscribe((data:any)=>{
        const {id} = data
        // console.log(id);
        // api call to get a particular product details
        this.getProductDetails(id)
      })
    }

    getProductDetails = (id:any)=>{
        this.api.viewProductAPI(id).subscribe({
          next:(res:any)=>{
            this.product = res
            console.log(this.product);

          },
          error:(err:any)=>{
            console.log(err.message);
            
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
        alert("Proceeded to Cart")
      }
      else{
        alert("Please Login...")
      }
    }

  }
