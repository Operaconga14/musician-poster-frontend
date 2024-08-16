import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from "./components/layouts/default-layout/default-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mugivies';

  private meta = inject(Meta)
  private defualtTitle = inject(Title)



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.defualtTitle.setTitle(this.title)
    this.meta.addTags([
      { name: 'description', content: 'Post Gadgets, Products, Services, Gigs, Vancanies, New Musics for other musicians to see and See Post Gadgets, Products, Services, Gigs, Vancanies, New Musics of your interest from other musicians as well' },
      { name: 'keywords', content: 'Music, Gadgets, Bass Guuitar, Piano, Posts, Gigs, Audios, Production, Music Production, Class, Vacancy, Vacancies, Events, Churches, Needed, Money' }
    ])
  }
}
