import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
 repass : string;
  register = { 
    email : "",
    username :"",
    user_password : "",
    vinecoins: 0,
    address : "",
    is_customer : true,
    is_supplier : false

  }
  
  constructor(private api : ApiService) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.api.registerUser(this.register).subscribe(data=>{
      console.log(data);
      alert("Account successfully created ! ")
    },error=>{
      console.log(error);
    });
  }

}
