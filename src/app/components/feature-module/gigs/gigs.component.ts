import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gigs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gigs.component.html',
  styleUrl: './gigs.component.scss'
})
export class GigsComponent {
  allGigs: any;

}
