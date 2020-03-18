import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberListComponent } from "./member-list/member-list.componen";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  { path: "", component: MemberListComponent },
  { path: "product-list", component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
