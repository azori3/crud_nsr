import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPatientPageRoutingModule } from './list-patient-routing.module';

import { ListPatientPage } from './list-patient.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddPatientComponent } from '../components/add-patient/add-patient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    ListPatientPageRoutingModule
  ],
  declarations: [ListPatientPage,AddPatientComponent],
  entryComponents:[AddPatientComponent]
})
export class ListPatientPageModule {}
