import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/feature-module/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'market-place',
        loadComponent: () => import('./components/feature-module/market-place/market-place.component').then(c => c.MarketPlaceComponent)
    },
    {
        path: 'gigs',
        loadComponent: () => import('./components/feature-module/gigs/gigs.component').then(c => c.GigsComponent)
    },
    {
        path: 'vacancies',
        loadComponent: () => import('./components/feature-module/vacancies/vacancies.component').then(c => c.VacanciesComponent)
    },
    {
        path: 'services',
        loadComponent: () => import('./components/feature-module/services/services.component').then(c => c.ServicesComponent)
    },
    {
        path: 'blogs',
        loadComponent: () => import('./components/feature-module/blogs/blogs.component').then(c => c.BlogsComponent)
    },
    {
        path: 'events',
        loadComponent: () => import('./components/feature-module/events/events.component').then(c => c.EventsComponent)
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'contributors',
        loadComponent: () => import('./components/feature-module/contributors/contributors.component').then(c => c.ContributorsComponent)
    },
    {
        path: 'me',
        loadComponent: () => import('./components/auth/profile/profile.component').then(c => c.ProfileComponent)
    },
    // {
    //     path: 'create-post',
    //     loadComponent: () => import('./components/auth/create-post/create-post.component').then(c => c.CreatePostComponent)
    // },
    {
        path: 'create-vacancy',
        loadComponent: () => import('./components/auth/post-vacancies/post-vacancies.component').then(c => c.PostVacanciesComponent)
    },
    // {
    //     path: 'create-event',
    //     loadComponent: () => import('./components/auth/post-event/post-event.component').then(c => c.PostEventComponent)
    // },
    // {
    //     path: 'privacy-policy',
    //     loadComponent: () => import('./components/feature-module/policy/policy.component').then(c => c.PolicyComponent)
    // },
    // {
    //     path: 'create-gig',
    //     loadComponent: () => import('./components/auth/post-gigs/post-gigs.component').then(c => c.PostGigsComponent)
    // }
];
