import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productState: any = {
    products: [],
    keyWord: "",
    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    totalProducts: 0,
    status: "",
    errorMessage: ""
  };

  constructor() { }

  public setProductState(state: any): void{
    //{...this.productState, ...state} permet de dire qu'il faut copier l'état actuelle et transmettre une copie des données passé en paramètre
    this.productState = {...this.productState, ...state};
  }
}
