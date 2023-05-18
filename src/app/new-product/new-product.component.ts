import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  implements  OnInit{

  formProduct!  : FormGroup;
  constructor(private  productService: ProductService, private  fb: FormBuilder , private  router : Router) {
  }
  ngOnInit(): void {
    this.formProduct = this.fb.group({
      name: this.fb.control(""),
      price: this.fb.control(0),
      checked: this.fb.control(false)
    }
    )
  }

  handleSaveProduct() {
    let product = this.formProduct.value;
    this.productService.saveProduct(product).subscribe({
      next : createdProduct => {
         //alert(JSON.stringify(createdProduct));
        this.router.navigate(["/products"]);
      },
      error : err => {
        console.log(err)}
    })
  }

}
