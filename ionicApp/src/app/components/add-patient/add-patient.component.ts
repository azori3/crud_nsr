import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Patient } from 'src/app/Model/patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {

patient:Patient = {
  id : 123,
  firstName:"ali",
  lastName: "ali",
  email: "ali",
  phoneNumber: "ali",
  dateOfBirth: new Date(),

};

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }

}
