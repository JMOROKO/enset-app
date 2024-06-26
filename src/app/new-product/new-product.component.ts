import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!: FormGroup;
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      checked: this.fb.control(false),
    })
  }
  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
