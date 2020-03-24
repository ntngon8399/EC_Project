import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./product-detail.component.html"
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: string;
  private sub: Subscription;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private productService: ProductService
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.sub = this._Activatedroute.params.subscribe(params => {
      this.id = params["_id"];
      this.product = this.productService.findProduct(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
