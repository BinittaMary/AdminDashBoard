import { Component, OnInit } from '@angular/core';
import { fruits } from './fruits-list';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ViewCourseComponent } from '../view-course/view-course.component';
import { CoursesService } from '../courses.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,  NbCheckboxComponent  } from '@nebular/theme';


@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  Courses : any;
  CoursesActual: any;
  constructor(private windowService: NbWindowService, public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseObj.getCourses()
    .subscribe((courses)=>{
      this.Courses = courses;
      this.CoursesActual =  courses;
      console.log(this.Courses);
    });
  }
  fruits = fruits;

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Courses, event.previousIndex, event.currentIndex);

  }
  viewCourse(course : any) {
    // localStorage.setItem("adminViewCourseID", course._id.toString());
    // this.router.navigate(['viewcourse']);
    this.router.navigate(['../viewcourse'], { relativeTo: this.route });

  }
  editCourse() {
    this.windowService.open(CourseFormComponent, { title: `Edit Course` });
  }
  
  addCourse() {
    this.windowService.open(CourseFormComponent, { title: `Add Course` });
  }
  

  deleteCourse() {

  }


  saveCourseIndex(){
    console.log(this.Courses);
    for(let i= 0; i<this.Courses.length; i++){
    this.Courses[i].index=i;  
    this.courseObj.updateCourseIndex(this.Courses[i])
    .subscribe((course)=>{
      // console.log(course);
    });
  }
 }

 resetCourseIndex(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
 }
}


