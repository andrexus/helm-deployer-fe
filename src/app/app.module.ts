import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { ChartValuesModule } from './chart-values/chart-values.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/chart-values', pathMatch: 'full' },
    ]),

    AppCommonModule,
    ChartValuesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
