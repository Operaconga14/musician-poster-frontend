import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { EventsService } from '../../core-module/services/events.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1920/500`)
  images = [`/img/gigs.jpg`, `/img/music-gadgets.jpg`, `/img/violing.jpg`]

  allEvent: any

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
    this.allEvent = this.eventService.getAllEvents()
  }
}
