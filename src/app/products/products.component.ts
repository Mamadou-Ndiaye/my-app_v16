import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit{

  keyword: string = ""

  products : Array<Product> = [] ;

  currentPage = 1;
  pageSize = 2;
  totalItems: number = 0;
  totalPages = 2;


  constructor(private  productService : ProductService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProduct(this.currentPage, this.pageSize)
      .subscribe({
        next : response => {
          this.products = response;
          this.getTotalPage();
        },
        error: err => {
          console.log(err)}
      });


  }

  getTotalPage(){
    this.productService.getTotalItems()
      .subscribe( {
        next : totalItems  =>{
          this.totalItems = totalItems;
          this.totalPages =   Math.ceil(this.totalItems / this.pageSize);
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }



  handleUpdateCheck(product: Product) {
    this.productService.handleUpdateCheck(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked
      },
      error: err => {
        console.log(err)
      }
    })
  }

    handleDeleteProduct(product: Product) {
      this.productService.deleteProduct(product).subscribe({
        next : data => {
          this.products= this.products.filter(p=> p.id !== product.id);
        },
        error : err => {
          console.log(err)}
      });
    }


  searchProduct() {
    this.productService.searchProducts(this.keyword).subscribe({
      next: product => {
         this.products = product;
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
