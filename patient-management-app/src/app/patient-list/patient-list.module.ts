import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientListPageRoutingModule } from './patient-list-routing.module';

import { PatientListPage } from './patient-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PatientListPageRoutingModule
  ],
  declarations: [PatientListPage,PatientFormComponent,UpdatePatientComponent],
  entryComponents:[PatientFormComponent,UpdatePatientComponent]
})
export class PatientListPageModule {}
