import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area';

const baseUrlArea = 'https://api.coronavirus.data.gov.uk/generic/area/ltla';


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(baseUrlArea);
  }
}
