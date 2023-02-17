import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AddPatientComponent } from '../components/add-patient/add-patient.component';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.page.html',
  styleUrls: ['./list-patient.page.scss'],
})
export class ListPatientPage implements OnInit {


  dataParams: any = {  
    page_num: '',  
    page_size: ''  
  };

  rows:any = [] ;
  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;

  constructor(private modalController:ModalController,private alertController:AlertController) { }

  ngOnInit() {
    this.dataParams.page_num = 1;
    this.dataParams.page_size= 9;
  }


  async addPatient(){
  
    const modal = await this.modalController.create({
      component: AddPatientComponent,
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
