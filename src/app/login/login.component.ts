import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


      loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z-0-9]*')]]
      })

      constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

      login(){
       
          if(this.loginForm.valid){
            const email = this.loginForm.value.email
            const password = this.loginForm.value.password
            
      
            console.log(`${email},${password}`);
            const reqBody={
              email,password
            }
            this.api.loginAPI(reqBody).subscribe({
              next:(res:any)=>{
                console.log(res);
                sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
                sessionStorage.setItem("token",JSON.stringify(res.token))

                //navigate login
                this.router.navigateByUrl('')
                
              },
              error:(err:any)=>{
                console.log(err);
                alert(err.error)
                
              }
            })
      
          }else{
            alert("invalid form")
          }
       
      }

}
