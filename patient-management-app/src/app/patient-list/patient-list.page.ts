import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
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
    this.dataParams.page_num = 1;
    this.dataParams.page_size= 9;
  }


  async addPatient(){
  
    const modal = await this.modalController.create({
      component: PatientFormComponent,
      cssClass: 'modalsize--rubrique',
     
    });
    
    modal.onDidDismiss().then((data) => {
      
      //update List


    });
    return await modal.present();

  }


  deletePatient()
  {

    this.alertController.create({
      subHeader: 'Are you sure to delete this Patient ?',
      buttons: [
        {
          text: 'non',
          handler: (data: any) => {
            this.alertController.dismiss();
          }
        },
        {
          text: 'oui!',
          handler: (data: any) => {
            
            this.alertController.dismiss();
          }
        }
      ]
    })

  }

}
