import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccination } from '../models/vaccination';


const baseUrl = 'https://api.coronavirus.data.gov.uk/v1/data?' ;
const filters = 'filters=areaCode=E07000148;areaType=ltla' ;
const structure = '&structure={"date":"date","name":"areaName","code":"areaCode","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate", "newPeopleVaccinatedFirstDoseByVaccinationDate": "newPeopleVaccinatedFirstDoseByVaccinationDate", "newPeopleVaccinatedSecondDoseByVaccinationDate":"newPeopleVaccinatedSecondDoseByVaccinationDate"}';

@Injectable({
  providedIn: 'root'
})
export class VaccinationsService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Vaccination[]> {
    
    return this.http.get<Vaccination[]>(baseUrl+filters+structure);
  }

  getBySelect(areaCode: any){
    if(areaCode != null){
      // areaCode = 'E07000148' ;
      let filters = 'filters=areaCode='+areaCode+';areaType=ltla' ;
      return this.http.get<Vaccination[]>(baseUrl+filters+structure);
    }else{
      return this.http.get<Vaccination[]>(baseUrl+filters+structure);
    }
  }
}
