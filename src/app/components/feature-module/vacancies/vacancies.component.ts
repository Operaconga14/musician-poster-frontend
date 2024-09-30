import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { ApiService } from '../../core-module/services/api.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { ModalService } from '../../core-module/services/modal.service';
import { VacanciesService } from '../../core-module/services/vacancies.service';
import { VacancyModalComponent } from '../../modals/vacancy-modal/vacancy-modal.component';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent {
  allVacancies: any;

  public dateTimeService = inject(DatetimeService);
  private apiService = inject(ApiService)
  private vacancyService = inject(VacanciesService)
  public modalService = inject(ModalService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.vacancyService.getAllVacancies();
    this.vacancyService.allVacanciesList$.subscribe(vacancies => {
      this.allVacancies = vacancies
    })

    // this.getVacancieshhtp()
  }

  async getVacancyDetails(id: any) {
    this.apiService.get(`vacancy/vacancy/${id}`)
      .then(async response => {
        this.vacancyService.setVacancyDetail(response.data.vacancy);
        this.modalService.openModal(VacancyModalComponent);
      });
  }

  // getVacancieshhtp() {
  //   this.apiService.gettp('vacancy/vacancies')
  //   .subscribe(vacant => {
  //     console.log('Vacanciesshs', vacant);
  //   })
  // }

}
