import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadernavComponent } from './headernav/headernav.component';
import { DashpostComponent } from './dashpost/dashpost.component';
import { BirthdayAnniversaryServiceService } from './service/birthday-anniversary-service.service';
import { SubheaderComponent } from './subheader/subheader.component';
import { BirthdayWorkAnniversaryComponent } from './birthday-work-anniversary/birthday-work-anniversary.component';
import { PostapiService } from './service/postapi.service';
import { EventsComponent } from './events/events.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostformComponent } from './postform/postform.component';
import { AddeventComponent } from './addevent/addevent.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventserviceService } from './service/eventservice.service';
import { LoginuserService } from './service/loginuser.service';
import { PostDetailsService } from './service/post-details.service';
import { PostDetailComponent } from './post-detail/post-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UpcomingEventsComponent,
    DashboardComponent,
    HeadernavComponent,
    DashpostComponent,
    SubheaderComponent,
    BirthdayWorkAnniversaryComponent,
    EventsComponent,
    AddPostComponent,
    PostformComponent,
    AddeventComponent,
    LoginComponent,
    SignupComponent,
    MyProfileComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BirthdayAnniversaryServiceService, PostapiService,EventserviceService,LoginuserService,PostDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
