import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { catchError, Subscription, throwError } from 'rxjs';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit, OnDestroy {



  dataParams: any = {
    page_num: '',
    page_size: ''
  };

  rows: any = [];
  patientSubscription: Subscription | undefined;
  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;

  constructor(private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController:ToastController,
    private alertController: AlertController,
    private patientService: PatientService) { }

  

 async ngOnInit() {
    const loading = await this.loadingController.create({})
    await loading.present();
    this.getListPatient().then(()=>{loading.dismiss()});
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 9;
  }
    
  ngOnDestroy(): void {
    this.patientSubscription?.unsubscribe();
  }



  async updatePatient(row: any) {

    const modal = await this.modalController.create({
      component: UpdatePatientComponent,
      cssClass: 'modalsize--rubrique',
      componentProps: {
        data: row
      }
    });

    modal.onDidDismiss().then(() => {
      this.getListPatient();
    });
    return await modal.present();

  }




  async addPatient() {

    const modal = await this.modalController.create({
      component: PatientFormComponent,
      cssClass: 'modalsize--rubrique',

    });

    modal.onDidDismiss().then(() => {
      this.getListPatient();
    });
    return await modal.present();

  }

  async getListPatient() {

   
    this.patientSubscription = this.patientService.getAllPatients().pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error) {
          this.presentToast('Please try again later, server error occurred','danger')
        }
       
        return throwError(error);
      })
    ).subscribe(patients => {

      patients.forEach(patient => {

        patient.dateBirth = formatDate(new Date(patient.dateBirth), 'yyyy-MM-dd', 'fr');

      });

      this.rows = patients;
     

    });
  }


  async deletePatient(row: any) {

    const alert = await this.alertController.create({
      header: 'Are you sure to delete this Patient ?',
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            this.deletePatientAction(row.id);
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();

  }

  deletePatientAction(id: string) {
    this.patientService.deletePatient(id).subscribe(res => {
    });
  }

  async presentToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: color
    });
    toast.present();
  }

}
