import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { EventsComponent } from './components/events/events.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ContactComponent } from './components/contact/contact.component';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IdeaComponent } from './components/idea/idea.component';
import { AcceptedIdeasComponent } from './components/accepted-ideas/accepted-ideas.component';
import { IdeaListClientComponent } from './components/idea-list-client/idea-list-client.component';
import { IdeaListAdminComponent } from './components/idea-list-admin/idea-list-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubmitIdeaComponent } from './components/submit-idea/submit-idea.component';
import { IdeaDetailsAdminComponent } from './components/idea-details-admin/idea-details-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './services/token.service';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminStatisticsComponent } from './components/admin-statistics/admin-statistics.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
    TrainersComponent,
    EventsComponent,
    PricingComponent,
    DropdownComponent,
    ContactComponent,
    PostComponent,
    IdeaComponent,
    AcceptedIdeasComponent,
    IdeaListClientComponent,
    IdeaListAdminComponent,
    NavbarComponent,
    SubmitIdeaComponent,
    IdeaDetailsAdminComponent,
    LoginComponent,
    RegisterComponent,
    DiscussionComponent,
    AdminSidebarComponent,
    AdminStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
  ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
