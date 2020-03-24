import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberListComponent } from "./member/member-list.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";

const routes: Routes = [
  { path: "", component: MemberListComponent },
  {
    path: "product",
    component: ProductListComponent
    // children: [{ path: "detail/:_id", component: ProductDetailComponent }]
  },
  { path: "product/detail/:_id", component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  name;
}
