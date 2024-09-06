import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContributorsService } from '../../core-module/services/contributors.service';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.scss'
})
export class ContributorsComponent {

  contributors: any

  private contributorService = inject(ContributorsService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.contributors = this.contributorService.contributors
  }

}
