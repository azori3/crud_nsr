import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {

 

  dataParams: any = {  
    page_num: '',  
    page_size: ''  
  };

  rows:any = [] ;
  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;

  constructor(private modalController:ModalController,private alertController:AlertController,private patientService:PatientService) { }

  ngOnInit() {

    this.getListPatient();
    this.dataParams.page_num = 1;
    this.dataParams.page_size= 9;
  }

  async updatePatient(row: any){
  
    const modal = await this.modalController.create({
      component: UpdatePatientComponent,
      cssClass: 'modalsize--rubrique',
      componentProps: { 
       data:row
      }

     
    });
    
    modal.onDidDismiss().then((data) => {
      this.getListPatient();


    });
    return await modal.present();

  }




  async addPatient(){
  
    const modal = await this.modalController.create({
      component: PatientFormComponent,
      cssClass: 'modalsize--rubrique',
     
    });
    
    modal.onDidDismiss().then((data) => {
      this.getListPatient();


    });
    return await modal.present();

  }

  getListPatient()
  {
    this.patientService.getAllPatients().subscribe(patients => {

     patients.forEach(patient => {

      patient.dateBirth = formatDate(new Date(patient.dateBirth), 'yyyy-MM-dd','fr')
  
    });  

      this.rows = patients;

      
      
    })
  }


 async deletePatient(row:any)
  {

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

  deletePatientAction(id:string)
  {
    this.patientService.deletePatient(id).subscribe(res => {
      this.getListPatient();
    });
  }

}