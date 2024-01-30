import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskEvenNumbersSumComponent } from './components/task-even-numbers-sum/task-even-numbers-sum/task-even-numbers-sum.component';
import { TaskEvenNumbersSumDialogComponent } from './components/task-even-numbers-sum/task-even-numbers-sum-dialog/task-even-numbers-sum-dialog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'even-numbers-sum', component: TaskEvenNumbersSumComponent },
    { path: 'even-numbers-sum-dialog', component: TaskEvenNumbersSumDialogComponent },
    { path: '**', component: PageNotFoundComponent },
];
