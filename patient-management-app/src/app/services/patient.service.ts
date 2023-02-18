import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) { }

  getAllPatients() {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: number) {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  addPatient(patient: Patient) {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  updatePatient(patient: Patient) {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient);
  }

  deletePatient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
