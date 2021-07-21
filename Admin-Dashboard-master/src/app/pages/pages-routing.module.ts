import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CoursesComponent } from './courses/courses.component';
import { StaffsComponent } from './staffs/staffs.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { UsersComponent } from './users/users.component';
import { ViewCourseComponent } from './view-course/view-course.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'staffs',
      component: StaffsComponent,
    },
    {
      path: 'courses',
      component:CoursesComponent,
    },
    {
      path: 'viewcourse',
      component:ViewCourseComponent,
    },
    {
      path: 'testimonials',
      component:TestimonialsComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
