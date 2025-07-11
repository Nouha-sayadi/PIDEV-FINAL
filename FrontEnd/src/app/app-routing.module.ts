import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EventsComponent } from './components/events/events.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { PostComponent } from './components/post/post.component';
import { IdeaComponent } from './components/idea/idea.component';
import { IdeaListAdminComponent } from './components/idea-list-admin/idea-list-admin.component';
import { IdeaListClientComponent } from './components/idea-list-client/idea-list-client.component';
import { SubmitIdeaComponent } from './components/submit-idea/submit-idea.component';
import { IdeaDetailsAdminComponent } from './components/idea-details-admin/idea-details-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminStatisticsComponent } from './components/admin-statistics/admin-statistics.component';

// ✅ Import your AuthGuard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Public / client routes
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'Events', component: EventsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'Trainers', component: TrainersComponent },
  { path: 'post', component: PostComponent },
  { path: 'idea', component: IdeaComponent },
  { path: 'IdeaListClient', component: IdeaListClientComponent },
  { path: 'submitIdea', component: SubmitIdeaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'discussion/:ideaId', component: DiscussionComponent },
  { path: 'ideas/:id/discussion', component: DiscussionComponent },
  { path: 'sideBar', component: AdminSidebarComponent },

  { path: 'IdeaListAdmin', component: IdeaListAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/idea/:id', component: IdeaDetailsAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/statistic', component: AdminStatisticsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
