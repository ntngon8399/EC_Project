import { Injectable, OnInit } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService implements OnInit {
  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private httpClient: HttpClient) {
    // this.httpClient
    //   .get<{ products: Product[] }>("http://localhost:3000/get-product")
    //   .subscribe(data => {
      //     this.products = data.products;
      //     this.productUpdated.next([...this.products]);
      //   });
      this.ngOnInit();
      console.log("ser cons");
  }

  ngOnInit() {
    console.log("ser init");
    this.httpClient
      .get<{ products: Product[] }>("http://localhost:3000/get-product")
      .subscribe(data => {
        this.products = data.products;
        this.productUpdated.next([...this.products]);
      });
  }

  getProducts() {
    return this.productUpdated.asObservable();
  }

  findProduct(id) {
    return this.products.find(product => {
      product._id == id;
    });
  }
}
