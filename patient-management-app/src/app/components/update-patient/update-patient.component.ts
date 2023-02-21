import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Patient } from 'src/app/Model/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss'],
})
export class UpdatePatientComponent implements OnInit {

  patientForm!: FormGroup;
  data: any;
  todayDate:any = new Date();
  showPicker: boolean = false;

  constructor(private patientService: PatientService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.todayDate = formatDate(this.todayDate, 'yyyy-MM-dd', 'fr');

    this.initForm();
    console.log(this.data);

    this.patientForm.patchValue({
      id: this.data.id,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      email: this.data.email,
      phoneNumber: this.data.phoneNumber,
      dateBirth: this.data.dateBirth
    });



  }





  initForm() {
    this.patientForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl(''),
      dateBirth: new FormControl('', Validators.required)
    });
  }


  goBack() {
    this.modalController.dismiss();
  }




  async onSubmit() {

    if (this.patientForm.valid) {


      const date = formatDate(this.patientForm.value.dateBirth, 'yyyy-MM-dd', 'fr');

      if(date > this.todayDate)
      {
        this.presentToast("Please select a date of Birth before today","danger");
      }
      else {
        const loading = await this.loadingController.create({})
        await loading.present();
        const patient: Patient = ({
          id: this.patientForm.value.id,
          firstName: this.patientForm.value.firstName,
          lastName: this.patientForm.value.lastName,
          email: this.patientForm.value.email,
          phoneNumber: this.patientForm.value.phoneNumber,
          dateBirth: this.patientForm.value.dateBirth
        })
  
  
        this.patientService.updatePatient(patient).subscribe(res => {
          this.modalController.dismiss();
          loading.dismiss();
          this.presentToast('data updated successfully', 'primary')
        }, error => {
         
         
          this.modalController.dismiss();
          this.presentToast(error.error.title, "danger");
  
        })
      }

     
    }
  }

  async presentToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: color
    });
    toast.present();
  }

  close(){
    this.modalController.dismiss();
  }


}

