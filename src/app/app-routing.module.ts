import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesListComponent } from './components/cases-list/cases-list.component';
import { VaccinationsListComponent } from './components/vaccinations-list/vaccinations-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'cases', pathMatch: 'full' },
  { path: 'cases', component: CasesListComponent },
  { path: 'vaccinations', component: VaccinationsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
