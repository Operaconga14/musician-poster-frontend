import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeFormatPipe } from '../../core-module/pipes/time-format.pipe';
import { ApiService } from '../../core-module/services/api.service';
import { ContributorsService } from '../../core-module/services/contributors.service';
import { DatetimeService } from '../../core-module/services/datetime.service';
import { EventsService } from '../../core-module/services/events.service';
import { Gigservice } from '../../core-module/services/gigs.service';
import { ModalService } from '../../core-module/services/modal.service';
import { ThemeService } from '../../core-module/services/theme.service';
import { VacanciesService } from '../../core-module/services/vacancies.service';
import { EventModalComponent } from '../../modals/event-modal/event-modal.component';
import { GadgetModalComponent } from '../../modals/gadget-modal/gadget-modal.component';
import { GigsModalComponent } from '../../modals/gigs-modal/gigs-modal.component';
import { PostModalComponent } from '../../modals/post-modal/post-modal.component';
import { ServiceModalComponent } from '../../modals/service-modal/service-modal.component';
import { VacancyModalComponent } from '../../modals/vacancy-modal/vacancy-modal.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule, TimeFormatPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  isDarkTheme: boolean = false;
  showNavigationArrow = false;

  images = [
    `https://res.cloudinary.com/defmlxshw/image/upload/banner9_htcdkg.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner8_n5v1g2.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner6_nmdyff.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner1_otootu.jpg`
  ];
  newEvents: any;
  newGigs: any;
  newVacancies: any;
  newGadgets: any;
  newServices: any;
  contributors: any;
  dbDateTime: any;
  formattedDate: any;
  formatedTime: any;

  private eventService = inject(EventsService);
  private modalService = inject(ModalService);
  private gigService = inject(Gigservice);
  private apiService = inject(ApiService);
  private vacancyService = inject(VacanciesService);
  private contributorService = inject(ContributorsService);
  public dateTimeService = inject(DatetimeService);
  private themeService = inject(ThemeService);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.wrap = true;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // get new gigs
    this.gigService.getnewGigs();
    this.gigService.newGigsList$.subscribe(newgigs => {
      this.newGigs = newgigs;
      this.formatedTime = this.dateTimeService.fromatTime(this.newGigs.time);
    });
    // get new events
    this.eventService.getnewEvents();
    this.eventService.newEventsList$.subscribe(newevents => {
      this.newEvents = newevents;
    });
    // getr new vacancies
    this.vacancyService.getnewVacancies();
    this.vacancyService.newVacanciesList$.subscribe(newvacancies => {
      this.newVacancies = newvacancies;
    });
    // get all contributors
    this.contributors = this.contributorService.contributors;
    // change theme
    this.themeService.currentTheme.subscribe(theme => this.isDarkTheme = theme);
  }


  getEventId(id: any) {
    this.eventService.getEventDetail(id);
    this.modalService.openModal(EventModalComponent);
  }

  async getGigDetail(id: any) {
    this.apiService.get(`gig/gig/${id}`)
      .then(async response => {
        this.gigService.setGigsDetail(response.data.gig);
        this.modalService.openModal(GigsModalComponent);
      });
  }
  getVacancyId(id: any) {

    this.modalService.openModal(VacancyModalComponent);
  }

  getGadgetId(id: any) {

    this.modalService.openModal(GadgetModalComponent);
  }

  getPostId(id: any) {

    this.modalService.openModal(PostModalComponent);
  }

  getServiceId(id: any) {

    this.modalService.openModal(ServiceModalComponent);
  }


}
