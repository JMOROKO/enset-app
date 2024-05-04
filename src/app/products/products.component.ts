import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  // par convention on utilise $ à la fin de l'écriture d'une variable qui est un observable

  constructor(private productService: ProductService
              , private router: Router, public appState: AppStateService) {
  }
  ngOnInit(): void {
    //get<Array<any>> demande à la méthode get de retourner un tableau de type any
    this.searchProduct();
  }

  searchProduct(){
    //aller au state modifier la valeur de status sans toucher le reste
    //this.appState.setProductState({status: "LOADING"});
    this.productService.searchProduct(this.appState.productState.keyWord, this.appState.productState.currentPage,this.appState.productState.pageSize).subscribe({
      next: (resp) => {
        // as Product[] permet de caster la réponse en liste de Produit
        //this.appState.productState.products = resp.body as Product[];
        let products = resp.body as Product[];
        // cette instruction resp.headers.get('x-total-count') permet de retourner un entier ou un null
        // le compilateur n'arrive pas à compiler car on ne peut affecter un null à un number
        // donc nous avons ajouté ! à la fin afin de spécifier au compilateur qu'il faut ignorer
        // @TODO impossible d'accéder à Total l'entête X-Total-Count => il faut installer npm i -g json-server@0.17.4
        let totalProducts = parseInt(resp.headers.get('X-Total-Count')!);
        //this.appState.productState.totalProducts = totalProducts;
        console.log(totalProducts);
        let totalPages = Math.floor(totalProducts / this.appState.productState.pageSize);
        console.log(this.appState.productState.totalPages);
        if(totalProducts % this.appState.productState.pageSize != 0){
          totalPages++;
        }
        this.appState.setProductState({
          products: products,
          totalProducts: totalProducts,
          totalPages: totalPages,
          //status: "LOADED"
        })
      },
      error: err => {
        this.appState.setProductState({
          status: "ERROR",
          errorMessage: "err"
        })
      }
    })
  }

  handleCheckProduct(product: any) {
    //la requete http patch est utilisé lorsqu'on veut modifier un seul attribut
    //la requete http put est utilisé lorsqu'on veut modifier tout les attributs
    this.productService.checkProduct(product)
      .subscribe(
        {
          next: updatedProduct => {
            product.checked = !product.checked;
            /*
            @TODO date cette section vous nous expliquez qu'il est préférable d'utiliser l'instruction qui permet
              d'effectuer le rafraichissement des données directement sur le front dans toutes fois faire appel au getProduct
              pour un souci de performance => On verra à la prochaine séance
            directement sur l'interface sans toutes fois faire appel au back end. Dans ce cas comment gérer les accès concurrent sur une données ?
            => On suppose que nous sommes dans le cas ou une personne est entrain de noter les prix des produits et doit checker chaque fois
            qu'il a récupéré un prix sauf qu'au moment ou il chargeait la page le prix était de 500DH
            mais avant d'arriver sur ce produit particulier un admin a modifié le prix à 400DH
             */
            //1:16:13
            //this.getProduct();
          },
          error: err => {

          }
        }
      )
  }

  handleDeleteProduct(product: Product) {
    if(!confirm("Etes vous sur de vouloir supprimer ?")) return;
    this.productService.deleteProduct(product).subscribe({
      next: data => {
        //this.appState.productState.products = this.appState.productState.products.filter((p:any) => p.id !=product.id)
        this.searchProduct();
      }
    });
  }


  handleGoToPage(page: number) {
    this.appState.productState.currentPage = page;
    this.searchProduct();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }
}
