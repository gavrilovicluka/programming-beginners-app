import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskEvenNumbersSumComponent } from './components/task-even-numbers-sum/task-even-numbers-sum.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'even-numbers-sum', component: TaskEvenNumbersSumComponent },
    { path: '**', component: PageNotFoundComponent },
];
