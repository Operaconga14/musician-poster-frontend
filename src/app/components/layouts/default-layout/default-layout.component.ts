import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastsComponent } from "../../core-module/toasts/toasts.component";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, ToastsComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
