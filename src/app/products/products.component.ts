import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit{

  baseUrl : string = "http://localhost:8889/products/";

  products! : Array<any> ;

  constructor(private  http : HttpClient) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
       this.http.get<Array<any>>(this.baseUrl).subscribe({
        next : data => {
          this.products = data;
        },
        error : err => {
          console.log(err)}
      })
  }

  handleUpdateCheck(product: any) {
      this.http.patch(this.baseUrl+product.id, {checked : !product.checked}).subscribe({
        next : updatedProduct => {
           product.checked = !product.checked
        },
        error : err => {
          console.log(err)}
      })
  }
}
