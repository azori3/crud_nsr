import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {

  patientForm:any;

  mode:string = 'Add'

  constructor(private http: HttpClient,private modalController:ModalController) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl(''),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }


  goBack()
  {
    this.modalController.dismiss();
  }




  onSubmit() {
    if (this.patientForm.valid) {
      this.http.post('/api/patients', this.patientForm.value).subscribe(
        (response) => {
          console.log('Patient created successfully:', response);
        },
        (error) => {
          console.log('Failed to create patient:', error);
        }
      );
    }
  } 

}
