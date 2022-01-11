import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../models/case';

const baseUrl = 'https://api.coronavirus.data.gov.uk/v1/data?' ;
const filters = 'filters=areaCode=E07000148;areaType=ltla' ;
const structure = '&structure={"date":"date","name":"areaName","code":"areaCode","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate", "newPeopleVaccinatedFirstDoseByVaccinationDate": "newPeopleVaccinatedFirstDoseByVaccinationDate", "newPeopleVaccinatedSecondDoseByVaccinationDate":"newPeopleVaccinatedSecondDoseByVaccinationDate"}';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Case[]> {
    
    return this.http.get<Case[]>(baseUrl+filters+structure);
  }

  getBySelect(areaCode: any){
    if(areaCode != null){
      // areaCode = 'E07000148' ;
      let filters = 'filters=areaCode='+areaCode+';areaType=ltla' ;
      return this.http.get<Case[]>(baseUrl+filters+structure);
    }else{
      return this.http.get<Case[]>(baseUrl+filters+structure);
    }
  }
}
