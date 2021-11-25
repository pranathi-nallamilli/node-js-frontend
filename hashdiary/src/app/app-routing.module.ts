import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AddeventComponent } from './addevent/addevent.component';
import { BirthdayWorkAnniversaryComponent } from './birthday-work-anniversary/birthday-work-anniversary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post/post.component';
import { BirthdayAnniversaryServiceService } from './service/birthday-anniversary-service.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [{path : "dashboard", component: DashboardComponent , pathMatch: "full"},
{path : "birthdayanniversary", component: BirthdayWorkAnniversaryComponent , pathMatch: "full"},
{path : "events", component: EventsComponent, pathMatch: "full"},
{ path: "profile", component: MyProfileComponent, pathMatch: "full" },
{path : "posts", component: PostComponent, pathMatch: "full"},
{path : "addpost", component: AddPostComponent, pathMatch: "full"},
{path : "addevent", component: AddeventComponent, pathMatch: "full"},
{path: "showpost", component:PostDetailComponent, pathMatch: "full"},
{path : "login", component: LoginComponent, pathMatch: "full"},
{path : "signup", component: SignupComponent, pathMatch: "full"},
{path: '**', redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
