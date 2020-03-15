import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemListComponent } from "./mem-list/mem-list.component";
import { ProductListComponent } from './product-category/product-list.component';

//Path cant start with a slash (/)
const routes: Routes = [
  { path: "", component: MemListComponent },
  { path: "product-list", component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
