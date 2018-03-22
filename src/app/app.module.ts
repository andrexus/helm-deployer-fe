import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './app-common/app-common.module';
import { RouterModule, Routes } from '@angular/router';
import { ChartValuesModule } from './chart-values/chart-values.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ReleasesModule } from './releases/releases.module';
import { WebHooksModule } from './web-hooks/web-hooks/web-hooks.module';


const appRoutes: Routes = [
  {path: '', redirectTo: '/web-hooks', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppCommonModule,
    ChartValuesModule,
    WebHooksModule,
    ReleasesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
