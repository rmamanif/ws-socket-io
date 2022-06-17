import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { PublicTicketsComponent } from './components/public-tickets/public-tickets.component';
import { QueueInitialComponent } from './components/queue-initial/queue-initial.component';
import { AttendTicketComponent } from './components/attend-ticket/attend-ticket.component';


const routes: Routes = [
  {
    path: '', component:QueueInitialComponent
  },
  {
    path: 'nuevo-ticket/:id', component:NewTicketComponent
  },
  {
    path:'publico', component:PublicTicketsComponent
  },
  {
    path:'atender-ticket', component:AttendTicketComponent
  },
  {
    path:'**', component:QueueInitialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
