import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Case } from 'src/app/models/case';
import { CasesService } from 'src/app/services/cases.service';
import { formatDate } from '@angular/common';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area';
import { FormBuilder, FormGroup } from '@angular/forms';

interface DateMY {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})

export class CasesListComponent implements OnInit {

  public cases: Case = [];
  public allCases: any;
  public selectedCases: any;
  public nbr: any = [];
  public areas: any = [];
  public allAreas: any;
  casesForm!: FormGroup;

  /** fill all months in select */
  months: DateMY[] = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' },
  ];


  years: DateMY[] = []

  chartData: any;
  countryName: any;

  constructor(private fb: FormBuilder, private casesService: CasesService, private areaService: AreaService) { }


  ngOnInit(): void {

    /** get all covid years dynamically by initiate to first year of covid until to current year  */
    for (let i = 0; i <= (new Date().getFullYear() - 2020); i++) {
      let firstYear = 2020;
      let selectYear = firstYear + i;
      this.years.push({ value: selectYear, viewValue: selectYear.toString() })
    }

    /** get areas(countries) from api to fill select form of country and to let user select the affected people by country */ 
    this.getAllAreas();

    /** get and subscribre all cases added by api */ 
    this.getAllCases();


    /** fill the default values of select form */
    this.casesForm = this.fb.group({
      area: [null],
      month: [null],
      year: [new Date().getFullYear()],
    });

  }

  /** get selected cases either by selecting country or by default country from api  */
  getCasesBySelect() {
    if (this.casesForm.value.area != null) {
      this.casesService.getBySelect(this.casesForm.value.area).subscribe({
        next: (data) => {
          this.cases = data;
          this.selectedCases = this.cases.data;
          /** empty the array of nbr field to fill with new selecting data */
          this.nbr.length = 0;

          /** loop the data and push the new cases in this.nbr field to put it in chart data with date which selected by month or year or both */
          for (let i = 0; i < this.selectedCases.length; i++) {
            let date = formatDate(new Date(this.selectedCases[i].date), 'dd-MMM-yyyy', 'en');
            this.countryName = this.allCases[i].name ;
            this.getByMonthYear(this.casesForm.value.month, this.casesForm.value.year, new Date(this.selectedCases[i].date), this.selectedCases[i].newCasesByPublishDate, this.nbr);
          }
        }
      });
    } else {
      this.casesService.getAll()
        .subscribe({
          next: (data) => {
            this.cases = data;
            this.selectedCases = this.cases.data;
            this.nbr.length = 0;

            /** loop the data and push the new cases in this.nbr field to put it in chart data with date which selected by month or year or both */
            for (let i = 0; i < this.selectedCases.length; i++) {
              this.countryName = this.allCases[i].name ;
              this.getByMonthYear(this.casesForm.value.month, this.casesForm.value.year, new Date(this.selectedCases[i].date), this.selectedCases[i].newCasesByPublishDate, this.nbr)
            }
          },
          error: (e) => console.error(e)
        });
    }

  }


  /** get all cases by default daily and norwich area without selecting month or year or country */
  getAllCases() {
    this.casesService.getAll()
      .subscribe({
        next: (data) => {
          this.cases = data;
          this.allCases = this.cases.data;
          console.log(this.allCases);
          this.nbr.length = 0;

          /** loop the data and push the new cases in this.nbr field to put it in chart data with date (daily) */
          for (let i = 0; i < this.allCases.length; i++) {
            let date = formatDate(new Date(this.allCases[i].date), 'dd-MMM-yyyy', 'en');
            this.countryName = this.allCases[i].name ;
            this.nbr.push([date, this.allCases[i].newCasesByPublishDate]);
          }
          this.drawChart(this.nbr);
        },
        error: (e) => console.error(e)
      });

  }

  /** draw chart in each changes by selecting */
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

  /** select cases by selecting month and year together or by only year */
  getByMonthYear(month: any, year: any, selectedDate: any, newCases: any, nbr: any) {
    if ((month != null) && (year != null)) {
      if (year + "-" + month == (selectedDate.getFullYear()) + "-" + (selectedDate.getMonth() + 1)) {
        let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');
        nbr.push([date, newCases]);
        this.drawChart(nbr);
      }
    } else if (year != null) {
      if (year == selectedDate.getFullYear()) {
        let date = formatDate(selectedDate, 'dd-MMM-yyyy', 'en');
        nbr.push([date, newCases]);
        this.drawChart(nbr);
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
