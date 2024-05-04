import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {ProductsComponent} from "../products/products.component";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8089";
  constructor(private http: HttpClient) { }

  public searchProduct(keyWord: string = "", page: number = 1, size: number = 4){
    return this.http.get(`${this.host}/products?name_like=${keyWord}&_page=${page}&_limit=${size}`, {observe: 'response'})
  }

  public checkProduct(product: Product): Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`, {checked: !product.checked});
  }

  public deleteProduct(product: Product){
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }
  public saveProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.host}/products`, product);
  }


  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
