
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Patient } from 'src/app/Model/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {

  patientForm:any;

  mode:string = 'Add'

  constructor(private patientService:PatientService,private modalController:ModalController) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      id: new FormControl('12'),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl(''),
      dateBirth: new FormControl('', Validators.required)
    });
  }


  goBack()
  {
    this.modalController.dismiss();
  }




  onSubmit() {
    if (this.patientForm.valid) {

      console.log(this.patientForm.value.firstName);

      const patient: Patient = ({
        id : "" ,
        firstName: this.patientForm.value.firstName ,
        lastName: this.patientForm.value.lastName ,
        email: this.patientForm.value.email ,
        phoneNumber:this.patientForm.value.phoneNumber ,
        dateBirth: this.patientForm.value.dateBirth
      })

      
    this.patientService.addPatient(patient).subscribe(res => {
      console.log(res);
      this.modalController.dismiss();
      
     },error => {
      console.log(error);
      
     }) 
    }
  } 

}