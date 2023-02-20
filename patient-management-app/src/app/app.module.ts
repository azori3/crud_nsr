import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [AppComponent],
  imports: [
     BrowserModule, 
     IonicModule.forRoot(), 
     NgxDatatableModule,
     FormsModule,
     HttpClientModule,
     ReactiveFormsModule,
     AppRoutingModule,
     ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LOCALE_ID, useValue: 'fr-FR'},],
  bootstrap: [AppComponent],
})
export class AppModule {}
