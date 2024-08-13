import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { EventsService } from '../../core-module/services/events.service';
import { ApiService } from '../../core-module/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1920/500`)
  images = [`/img/gigs.jpg`, `/img/music-gadgets.jpg`, `/img/violing.jpg`]

  allEvents: any

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

  private apiService = inject(ApiService)
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
    this.getAllEvents()
  }

  async getAllEvents() {
    this.apiService.get('event/events')
      .then(async events => {
        this.allEvents = events.data.events
        // console.log('These are Events', this.allEvents)

        this.allEvents.forEach((event:
          {
            id: any, title: any, description: any, username: any,
            createdAt: any, updatedAt: any
          }) => {
          // console.log('Event Title:', event.title, 'Event Username',event.username);
          return event
        });
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      })
  }

  getEventId(id: any) {
    this.eventService.getEventDetail(id)
  }

}
