import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'app/services/supplier.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  category : string;
  product_name : string;
  price : string;
  Image : File;
  supplier_id : string;
  quantity : Number;
  categories : any;
  product_edit_id : Number;
  isUpdate=false;
  product_description : string;
  constructor(private api : ApiService,  private route : ActivatedRoute, private SupplierService : SupplierService) { 
    this.route.params.subscribe(params =>{
      this.product_edit_id=params['product_id'];
      if(this.product_edit_id)
      this.isUpdate=true;
    });
  }

  onImageChanged(event : any){
    this.Image=event.target.files[0];
  }
  ngOnInit(): void {
    this.getCategories();

    var data = JSON.parse(localStorage.getItem('email'));
    var email=data.email;
    var id;
    this.api.getUserDetails(email).subscribe(data=>{
      id=data.sup_id.sup_id;
      var num=new Number(id);
      this.supplier_id=num.toString();
     });
    
  }
  getCategories(){
    this.SupplierService.getCategories().subscribe( responseData =>{
      console.log(responseData);
      this.category=responseData[0].category_name;
      this.categories=responseData;
      if(this.product_edit_id)
        this.getProductDetailsForUpdate(); //for update
    });
  }
  getProductDetailsForUpdate(){
      this.SupplierService.getSupplierProduct(this.product_edit_id).subscribe(responseData =>{
        console.log(responseData);
       this.category=responseData.category.category_name;
       this.product_name =responseData.prod_name;
       this.price =responseData.price;
       this.Image=responseData.cover;
       this.quantity=responseData.availability;
       this.product_description=responseData.product_description;
      });
  }
  reset(){ 
    this.category="";
    this.product_name="";
    this.price="";
    this.Image=null;
    this.quantity=null;
    this.product_description="";
  }
  addProduct(){
    var num=new Number(this.quantity);
    if(this.isUpdate){
      var id= new Number(this.product_edit_id);
      this.SupplierService.UpdateSupplierProduct(id.toString(),this.product_name,this.category,this.price,this.Image,this.supplier_id,num.toString(),this.product_description).subscribe(data =>{
        console.log(data);
       alert("Product updated Successfully");

      }, error =>{
        console.log(error);
        alert("Product updated Successfully");
      });
      console.log("YES");
    }
    else{
      this.SupplierService.addOneProduct(this.product_name,this.category,this.price,this.Image,this.supplier_id,num.toString(),this.product_description).subscribe( data=>{
        console.log(data);
        alert(this.product_name +" added successfully");
        this.reset();
      }, error =>{
        console.log(error);
        alert(this.product_name +" added successfully");
        this.reset();
      }
      );
    }
  }
}
