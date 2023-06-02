import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LikedEventsComponent } from './liked-events/liked-events.component';


const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent},
    { path: 'log-in',  component: LogInComponent},
    { path: 'event/:id', component: EventDetailComponent},
    { path: 'liked-events', component: LikedEventsComponent},
    {path: '**', pathMatch: 'full', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
