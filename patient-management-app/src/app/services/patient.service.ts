import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiUrl = environment.Api_Url+"api/Patients";

  constructor(private http: HttpClient) { }

  getAllPatients() {

    return this.http.get<Patient[]>(environment.Api_Url+"api/Patients")
  }

  getPatientById(id: number) {
    return this.http.get<Patient>(`${environment.Api_Url+"api/Patients"}/${id}`);
  }

  addPatient(patient: Patient) {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  updatePatient(patient: Patient) {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient);
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
