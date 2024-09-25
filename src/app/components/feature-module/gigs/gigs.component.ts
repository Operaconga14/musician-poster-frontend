import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { ApiService } from '../../core-module/services/api.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { Gigservice } from '../../core-module/services/gigs.service';
import { ModalService } from '../../core-module/services/modal.service';
import { GigsModalComponent } from '../../modals/gigs-modal/gigs-modal.component';

@Component({
  selector: 'app-gigs',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './gigs.component.html',
  styleUrl: './gigs.component.scss'
})
export class GigsComponent {
  allGigs: any;

  public dateTimeService = inject(DatetimeService);
  private apiService = inject(ApiService)
  private gigService = inject(Gigservice)
  public modalService = inject(ModalService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gigService.getAllGigs();
    this.gigService.allGigsList$.subscribe(gigs => {
      this.allGigs = gigs
    })
  }

  async getGigDetail(id: any) {
    this.apiService.get(`gig/gig/${id}`)
      .then(async response => {
        this.gigService.setGigsDetail(response.data.gig);
        this.modalService.openModal(GigsModalComponent);
      });
  }

}
