import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { ModalService } from '../../core-module/services/modal.service';
import { VacanciesService } from '../../core-module/services/vacancies.service';

@Component({
  selector: 'app-vacancy-modal',
  standalone: true,
  imports: [TimeFormatPipe, CommonModule],
  templateUrl: './vacancy-modal.component.html',
  styleUrl: './vacancy-modal.component.scss'
})
export class VacancyModalComponent {

  vacancyDetails: any;
  dbDateTime: any;
  formattedDate: any;
  formatedTime: any;

  public vacanciesService = inject(VacanciesService);
  public modalService = inject(ModalService);
  public dateTimeService = inject(DatetimeService)

  ngOnInit(): void {
    this.vacanciesService.vacancyDetail$.subscribe(result => {
      this.vacancyDetails = result;
      this.formattedDate = this.dateTimeService.fromatTime(this.vacancyDetails.time)
    });
  }

}
