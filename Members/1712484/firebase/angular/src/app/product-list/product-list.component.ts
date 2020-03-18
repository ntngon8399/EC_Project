import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent {
  productList = [];
  productBrand = [];

  constructor() {
    this.getProducts();
    this.getBrands();
  }

  async getProducts() {
    try {
      console.log(environment.getProductList);
      console.log("calling get product list endpoint");

      this.productList = [];
      const output = await fetch(environment.getProductList);
      const outputJSON = await output.json();
      this.productList = outputJSON;
      console.log("Success");
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }

  async getBrands() {
    this.productList.forEach(product => {
      if (!this.productBrand.includes(product.brand))
        this.productBrand.push(product.brand);
    });
  }
}
