import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ContributorsService } from '../../core-module/services/contributors.service';
import { EventsService } from '../../core-module/services/events.service';
import { ModalService } from '../../core-module/services/modal.service';
import { ThemeService } from '../../core-module/services/theme.service';
import { EventModalComponent } from '../../modals/event-modal/event-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isDarkTheme: boolean = false
  showNavigationArrow = false

  images = [
    `https://res.cloudinary.com/defmlxshw/image/upload/banner9_htcdkg.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner8_n5v1g2.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner6_nmdyff.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/banner1_otootu.jpg`
  ]

  allEvents: any
  newEvents: any
  contributors: any

  gigs = [
    {
      location: 'Abule Egba',
      genre: 'Jazz',
      contact: '+23468593668',
      availability: 'Available'
    },
    {
      location: 'Ikotun',
      genre: 'Gospel/ Tungba',
      contact: '+234687935468',
      availability: 'Taken'

    },
    {
      location: 'Iyana Ipaja',
      genre: 'Circular',
      contact: '+2346762893',
      availability: 'Available'

    },
    {
      location: 'Gbagada',
      genre: 'Gospel',
      contact: '+234665735438',
      availability: 'Not available'

    }
  ]

  private eventService = inject(EventsService)
  private modalService = inject(ModalService)
  private contributorService = inject(ContributorsService)
  private themeService = inject(ThemeService)

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.eventService.getnewEvents()
    this.eventService.newEventsList$.subscribe(newevents => {
      this.newEvents = newevents
    })
    this.contributors = this.contributorService.contributors
    console.log('Our contributors', this.contributors)
    this.themeService.currentTheme.subscribe(theme => this.isDarkTheme = theme)
  }


  getEventId(id: any) {
    this.eventService.getEventDetail(id)
    this.modalService.openModal(EventModalComponent)
  }

}
