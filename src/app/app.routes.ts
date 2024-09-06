import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/auth/create-post/create-post.component';
import { EditProfileComponent } from './components/auth/edit-profile/edit-profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostEventComponent } from './components/auth/post-event/post-event.component';
import { PostVacanciesComponent } from './components/auth/post-vacancies/post-vacancies.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BlogsComponent } from './components/feature-module/blogs/blogs.component';
import { ContributorsComponent } from './components/feature-module/contributors/contributors.component';
import { EventsComponent } from './components/feature-module/events/events.component';
import { GigsComponent } from './components/feature-module/gigs/gigs.component';
import { HomeComponent } from './components/feature-module/home/home.component';
import { MarketPlaceComponent } from './components/feature-module/market-place/market-place.component';
import { PolicyComponent } from './components/feature-module/policy/policy.component';
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
        path: 'contributors',
        component: ContributorsComponent
    },
    {
        path: 'img',
        component: EditProfileComponent
    },
    {
        path: 'me',
        component: ProfileComponent,
    },
    {
        path: 'create-post',
        component: CreatePostComponent
    },
    {
        path: 'create-vacancy',
        component: PostVacanciesComponent
    },
    {
        path: 'create-event',
        component: PostEventComponent
    },
    {
        path: 'privacy-policy',
        component: PolicyComponent
    }
];
