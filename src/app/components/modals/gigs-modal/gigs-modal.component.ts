import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { Gigservice } from '../../core-module/services/gigs.service';
import { ModalService } from '../../core-module/services/modal.service';

@Component({
  selector: 'app-gigs-modal',
  standalone: true,
  imports: [TimeFormatPipe, CommonModule],
  templateUrl: './gigs-modal.component.html',
  styleUrl: './gigs-modal.component.scss'
})
export class GigsModalComponent {

  gigDetails: any;
  dbDateTime: any;
  formattedDate: any;
  formatedTime: any;

  public gigService = inject(Gigservice);
  public modalService = inject(ModalService);
  public dateTimeService = inject(DatetimeService)

  ngOnInit(): void {
    this.gigService.gigsDetail$.subscribe(result => {
      this.gigDetails = result;
      this.formattedDate = this.dateTimeService.fromatTime(this.gigDetails.time)
    });
  }

}
