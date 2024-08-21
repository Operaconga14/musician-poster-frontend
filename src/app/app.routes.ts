import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BlogsComponent } from './components/feature-module/blogs/blogs.component';
import { EventsComponent } from './components/feature-module/events/events.component';
import { GigsComponent } from './components/feature-module/gigs/gigs.component';
import { HomeComponent } from './components/feature-module/home/home.component';
import { MarketPlaceComponent } from './components/feature-module/market-place/market-place.component';
import { ServicesComponent } from './components/feature-module/services/services.component';
import { VacanciesComponent } from './components/feature-module/vacancies/vacancies.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'market-place',
        component: MarketPlaceComponent
    },
    {
        path: 'gigs',
        component: GigsComponent
    },
    {
        path: 'vacancies',
        component: VacanciesComponent
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'blogs',
        component: BlogsComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },
    {
        path: 'me',
        component: ProfileComponent,
        // canActivate: [
        // ]
    },
    // {
    //     path: 'post-gigs',
    //     // component: ProfileComponent,
    //     // canActivate: []
    // },
    // {
    //     path: 'post-vacancies',
    //     // component: ProfileComponent,
    //     // canActivate: []
    // },
    // {
    //     path: 'post-goods',
    //     // component: ProfileComponent,
    //     // canActivate: []
    // }
];
