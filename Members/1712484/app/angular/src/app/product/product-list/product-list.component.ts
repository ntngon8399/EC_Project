import { Component, OnInit, OnDestroy, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
@Injectable({ providedIn: "root" })
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  brands = [];

  sub = new Subscription();

  constructor(private productService: ProductService) {
    this.ngOnInit();
    console.log("li cons");
  }

  ngOnInit() {
    console.log("li init");
    this.sub = this.productService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
