import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Patient } from 'src/app/Model/patient';
import { PatientService } from 'src/app/services/patient.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss'],
})
export class UpdatePatientComponent implements OnInit {

  patientForm!: FormGroup;
  mode:string = 'Add';
  data:any;

  showPicker: boolean = false;

  constructor(private patientService:PatientService,private modalController:ModalController) { }

  ngOnInit() {
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





  initForm()
  {
    this.patientForm = new FormGroup({
      id: new FormControl(''),
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


      const patient: Patient = ({
        id : this.patientForm.value.id ,
        firstName: this.patientForm.value.firstName ,
        lastName: this.patientForm.value.lastName ,
        email: this.patientForm.value.email ,
        phoneNumber:this.patientForm.value.phoneNumber ,
        dateBirth: this.patientForm.value.dateBirth
      })

      
    this.patientService.updatePatient(patient).subscribe(res => {
      console.log(res);
      
     },error => {
      console.log(error);
      
     }) 
    }
  } 

}

