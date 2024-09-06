import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  private apiService = inject(ApiService)

  private vacancyDetailSource = new BehaviorSubject<any>(null);
  private allVacanciesSource = new BehaviorSubject<any[]>([]);
  private newVacanciesSource = new BehaviorSubject<any[]>([]);
  vacancyDetail$ = this.vacancyDetailSource.asObservable();
  allVacanciesList$ = this.allVacanciesSource.asObservable();
  newVacanciesList$ = this.newVacanciesSource.asObservable();

  // allVacancies: any;
  // newvacancies: any

  setVacancyDetail(vacancyDetail: any) {
    this.vacancyDetailSource.next(vacancyDetail);
  }

  setNewVacancy(newVacancies: any) {
    this.newVacanciesSource.next(newVacancies)
  }

  setAllVacancies(allVacancies: any) {
    this.allVacanciesSource.next(allVacancies)
  }

  public async getVacancyDetail(id: any) {
    try {
      const response = await this.apiService.get(`vacancy/vacancy/${id}`)
      if (response.data && response.data.vacancy) {
        this.setVacancyDetail(response.data.vacancy)
        // Trigger modal opening here
      }
    } catch (error) {

    }
  }

  public async getnewVacancies() {
    try {
      const newVacancies = await this.apiService.get('vacancy/newvacancies')
      if (newVacancies.data && newVacancies.data.vacancy) {
        this.setNewVacancy(newVacancies.data.vacancy)
      }
    } catch (error) {

    }
  }

  public async getAllVacancies() {
    try {
      const allvacancies = await this.apiService.get('vacancy/vacancies')
      if (allvacancies.data && allvacancies.data.vacancies) {
        this.setAllVacancies(allvacancies.data.vacancies)
      }
    } catch (error) {

    }
  }
}
