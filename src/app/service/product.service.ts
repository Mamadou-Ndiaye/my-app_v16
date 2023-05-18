import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Product} from "../model/product";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  baseUrl : string = "http://localhost:8889/products/";

  constructor(private  http : HttpClient) { }

  getProduct(page:number=1, pageSize : number =5 ): Observable<Array<Product>>{
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString());
     return this.http.get<Array<Product>>(this.baseUrl,{ params });
  }
  handleUpdateCheck(product: Product): Observable<Product> {
     return  this.http.patch<Product>(this.baseUrl+product.id, {checked : !product.checked});
  }
  deleteProduct(product: Product)  {
     return  this.http.delete(this.baseUrl+product.id );
  }

  saveProduct(product: Product): Observable<Product> {
    return  this.http.post<Product>(this.baseUrl, product);
  }
  searchProducts(keyword: string): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(this.baseUrl+"?name_like="+keyword);
  }

  getTotalItems() {
    return this.http.head(this.baseUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return parseInt(<string>response.headers.get('X-Total-Count'), 10);
      })
    );
  }
}
