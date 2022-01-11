import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vaccination } from 'src/app/models/vaccination';
import { AreaService } from 'src/app/services/area.service';
import { VaccinationsService } from 'src/app/services/vaccinations.service';

interface DateMY {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-vaccinations-list',
  templateUrl: './vaccinations-list.component.html',
  styleUrls: ['./vaccinations-list.component.css']
})
export class VaccinationsListComponent implements OnInit {

  public vaccinations: Vaccination = [];
  public allVaccinations: any;
  public selectedVaccinations: any;
  public canvas: any;
  public ctx: any;
  public nbr: any = [];
  public areas: any = [];
  public allAreas: any;
  public columnNames: any = ["Day", "janvier"];
  casesForm!: FormGroup;

  years: DateMY[] = []

  chartData: any;

  constructor(private fb: FormBuilder, private casesService: VaccinationsService, private areaService: AreaService) { }


  ngOnInit(): void {

    for (let i = 0; i <= (new Date().getFullYear() - 2020); i++) {
      let firstYear = 2020;
      let selectYear = firstYear + i;
      this.years.push({ value: selectYear, viewValue: selectYear.toString() })
    }

    this.getAllAreas();
    this.getAllCases();

    this.casesForm = this.fb.group({
      area: [null],
      month: [null],
      // year: [null],
      year: [new Date().getFullYear()],
    });

  }

  getCasesBySelect() {
    // console.log(this.casesForm.value);
    // if (this.casesForm.value.area != null) {
    //   this.casesService.getBySelect(this.casesForm.value.area).subscribe({
    //     next: (data) => {
    //       this.cases = data;
    //       this.selectedCases = this.cases.data;
    //       console.log(this.selectedCases);
    //       this.nbr.length = 0;
    //       for (let i = 0; i < this.selectedCases.length; i++) {
    //         let date = formatDate(new Date(this.selectedCases[i].date), 'dd-MMM-yyyy', 'en');
    //         this.getByMonthYear(this.casesForm.value.month, this.casesForm.value.year, new Date(this.selectedCases[i].date), this.selectedCases[i].newCasesByPublishDate, this.nbr);
    //       }
    //     }
    //   });
    // } else {
    //   this.casesService.getAll()
    //     .subscribe({
    //       next: (data) => {
    //         this.cases = data;
    //         this.selectedCases = this.cases.data;
    //         // console.log(this.selectedCases);
    //         this.nbr.length = 0;
    //         for (let i = 0; i < this.selectedCases.length; i++) {

    //           this.getByMonthYear(this.casesForm.value.month, this.casesForm.value.year, new Date(this.selectedCases[i].date), this.selectedCases[i].newCasesByPublishDate, this.nbr)

    //         }
    //       },
    //       error: (e) => console.error(e)
    //     });
    // }

  }


  getAllCases() {
    // this.casesService.getAll()
    //   .subscribe({
    //     next: (data) => {
    //       this.cases = data;
    //       this.allCases = this.cases.data;
    //       console.log(this.allCases);

    //       this.nbr.length = 0;
    //       for (let i = 0; i < this.allCases.length; i++) {
    //         let date = formatDate(new Date(this.allCases[i].date), 'dd-MMM-yyyy', 'en');

    //         this.nbr.push([date, this.allCases[i].newCasesByPublishDate]);

    //       }
    //       this.drawChart(this.nbr);
    //     },
    //     error: (e) => console.error(e)
    //   });

  }

  drawChart(nbr: any) {
    this.chartData = {
      type: 'LineChart',
      data: nbr,
      columnNames: ["Day", "Number of cases"],
      options: {
        hAxis: {
          title: '- Cases by specimen date -'
        }
      },
      width: 1500,
      height: 900

    };
  }

  getByMonthYear(month: any, year: any, selectedDate: any, newCases: any, nbr: any) {
    // if ((month != null) && (year != null)) {
    //   if (year + "-" + month == (selectedDate.getFullYear()) + "-" + (selectedDate.getMonth() + 1)) {
    //     let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');

    //     nbr.push([date, newCases]);
    //     console.log("all cases: " + nbr);
    //     this.drawChart(nbr);

    //   }
    // } else if (year != null) {
    //   if (year == selectedDate.getFullYear()) {

    //     let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');

    //     nbr.push([date, newCases]);
    //     this.drawChart(nbr);


    //   }
    // }
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
