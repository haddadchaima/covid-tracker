import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Case } from 'src/app/models/case';
import { Vaccination } from 'src/app/models/vaccination';
import { AreaService } from 'src/app/services/area.service';
import { VaccinationsService } from 'src/app/services/vaccinations.service';

interface ValueSelect {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-vaccinations-list',
  templateUrl: './vaccinations-list.component.html',
  styleUrls: ['./vaccinations-list.component.css']
})
export class VaccinationsListComponent implements OnInit {

  public vaccination: Case = [];
  public allVaccinations: any;
  public selectedVaccinations: any;
  public canvas: any;
  public ctx: any;
  public nbr: any = [];
  public areas: any = [];
  public allAreas: any;
  public countryName : string = "" ;
  casesForm!: FormGroup;

  years: ValueSelect[] = [] ;
  doses: ValueSelect[] = [
    {value: 1, viewValue: "First Dose"},
    {value: 2, viewValue: "Second Dose"}
  ]

  chartData: any;

  constructor(private fb: FormBuilder, private casesService: VaccinationsService, private areaService: AreaService) { }


  ngOnInit(): void {

    for (let i = 0; i <= (new Date().getFullYear() - 2020); i++) {
      let firstYear = 2020;
      let selectYear = firstYear + i;
      this.years.push({ value: selectYear, viewValue: selectYear.toString() })
    }

    this.getAllAreas();
    this.getAllVaccination();

    this.casesForm = this.fb.group({
      area: [null],
      dose: [1],
      year: [new Date().getFullYear()],
    });

  }

  getCasesBySelect() {
    console.log(this.casesForm.value);
    if (this.casesForm.value.area != null) {
      this.casesService.getBySelect(this.casesForm.value.area).subscribe({
        next: (data) => {
          this.vaccination = data;
          this.selectedVaccinations = this.vaccination.data;
          console.log(this.selectedVaccinations);
          this.nbr.length = 0;
          for (let i = 0; i < this.selectedVaccinations.length; i++) {
            let date = formatDate(new Date(this.selectedVaccinations[i].date), 'dd-MMM-yyyy', 'en');
            this.countryName = this.allVaccinations[i].name ;
            this.getByDoseYear(this.casesForm.value.dose, this.casesForm.value.year, new Date(this.selectedVaccinations[i].date), this.selectedVaccinations[i].newPeopleVaccinatedFirstDoseByVaccinationDate, this.selectedVaccinations[i].newPeopleVaccinatedSecondDoseByVaccinationDate , this.nbr);
          }
        }
      });
    } else {
      this.casesService.getAll()
        .subscribe({
          next: (data) => {
            this.vaccination = data;
            this.selectedVaccinations = this.vaccination.data;
            // console.log(this.selectedCases);
            this.nbr.length = 0;
            for (let i = 0; i < this.selectedVaccinations.length; i++) {
              this.countryName = this.allVaccinations[i].name ;
              this.getByDoseYear(this.casesForm.value.dose, this.casesForm.value.year, new Date(this.selectedVaccinations[i].date), this.selectedVaccinations[i].newPeopleVaccinatedFirstDoseByVaccinationDate, this.selectedVaccinations[i].newPeopleVaccinatedSecondDoseByVaccinationDate , this.nbr);

            }
          },
          error: (e) => console.error(e)
        });
    }

  }


  getAllVaccination() {
    this.casesService.getAll()
      .subscribe({
        next: (data) => {
          this.vaccination = data;
          this.allVaccinations = this.vaccination.data;
          console.log(this.vaccination);

          this.nbr.length = 0;
          for (let i = 0; i < this.allVaccinations.length; i++) {
            let date = formatDate(new Date(this.allVaccinations[i].date), 'dd-MMM-yyyy', 'en');
            this.countryName = this.allVaccinations[i].name ;
            this.nbr.push([date, this.allVaccinations[i].newPeopleVaccinatedFirstDoseByVaccinationDate]);

          }
          this.drawChart(this.nbr);
        },
        error: (e) => console.error(e)
      });

  }

  drawChart(nbr: any) {
    this.chartData = {
      type: 'LineChart',
      data: nbr,
      columnNames: ["Day", "Number of vaccination per dose"],
      options: {
        hAxis: {
          title: '- Vaccinated People -'
        }
      },
      width: 1500,
      height: 900

    };
  }

  getByDoseYear(dose: any, year: any, selectedDate: any, newFirstDose: string, newSecondDose: string, nbr: any) {
    if ((dose != null) && (year != null)) {
      if ((dose == 1 )&&(year == selectedDate.getFullYear())) {
        let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');
        nbr.push([date, newFirstDose]);
        this.drawChart(nbr);

      }else if ((dose == 2 )&&(year == selectedDate.getFullYear())) {
        if (year == selectedDate.getFullYear()) {
          let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');
          nbr.push([date, newSecondDose]);
          this.drawChart(nbr);
        }
      }
    }
  }

  getAllAreas() {
    this.areaService.getAll().subscribe({
      next: (data) => {
        this.areas = data;
        console.log(this.areas);
      }
    })
  }

}
