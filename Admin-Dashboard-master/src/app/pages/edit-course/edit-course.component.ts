import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  course : any;
  images : any;
  imageModified : boolean=false;
  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let CourseId = localStorage.getItem("adminEditCourseID");
    this.imageModified=false;
    this.courseObj.getCourse(CourseId)
    .subscribe((courseItem)=>{
      this.course =courseItem;
      console.log(this.course);
      });
  }
  closeForm(){
    this.router.navigate(['../courses'], { relativeTo: this.route });    
  }
  editCourse()
  {
    this.course.course_delivery = this.course.course_delivery.replace('C:\\fakepath\\','');
    this.course.internship_partner = this.course.internship_partner.replace('C:\\fakepath\\','');
    this.course.knowledge_partner = this.course.knowledge_partner.replace('C:\\fakepath\\','');
    this.course.sponser_partner = this.course.sponser_partner.replace('C:\\fakepath\\','');
    this.course.course_image = this.course.course_image.replace('C:\\fakepath\\','');
    console.log(this.course)
    // if (this.imageModified){
    //   this.courseObj.editAuthorWithImage(this.images, this.course);
    // }
    // else{
    // this.courseObj.editAuthor(this.course);
    // }
    // this.courseObj.newCourse(this.images, this.course);
    // localStorage.setItem('bookAlertMsg', `The book ${this.course.title} is added`); 
    // this.router.navigate(['../courses'], { relativeTo: this.route }); 
  }

  selectImage(event : any) {
    console.log('select image')
    this.imageModified= true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images.push(file);
      console.log('inside if event')
    }    
  }
}
