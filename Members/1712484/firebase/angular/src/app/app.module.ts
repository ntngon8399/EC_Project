import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MemberListComponent } from './member-list/member-list.componen';
import { ProductListComponent } from './product-list/product-list.component';
import { ToolbarComponent } from './header/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MemberListComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
